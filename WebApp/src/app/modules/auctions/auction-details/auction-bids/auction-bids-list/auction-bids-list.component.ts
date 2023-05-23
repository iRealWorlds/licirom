import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { Bid } from '@licirom/modules/auctions/auction-details/auction-bids/bid.model';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { BidService } from '@licirom/modules/auctions/auction-details/auction-bids/bid.service';
import { interval, Subject, Subscription, takeUntil, takeWhile } from 'rxjs';
import { IndexOptions } from '@licirom/core/api/index-options.model';
import Pusher, { Channel } from 'pusher-js';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { utcToDate } from '@licirom/core/utils/utc-to-date.util';
import { AuctionStatus } from '@licirom/modules/auctions/auction-status.enum';

@Component({
  selector: 'app-auction-bids-list',
  templateUrl: './auction-bids-list.component.html',
  styleUrls: ['./auction-bids-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuctionBidsListComponent implements OnChanges, OnDestroy {
  @Input() auction?: Auction;

  statuses = AuctionStatus;

  bids?: Bid[];

  bidUpdateChannel?: Channel;

  private readonly _unsubscribeAll = new Subject<void>();
  private readonly _pusher: Pusher;

  private _timeUpdateSubscription?: Subscription;

  /**
   * Get the time left until this auction starts.
   */
  get timeUntilStart(): number {
    if (!this.auction) {
      return 0;
    }

    const now = new Date();
    const startDate = utcToDate(this.auction.startTime);

    if (now < startDate) {
      return Math.floor(Math.abs(startDate.getTime() - now.getTime()) / 1000);
    } else {
      return 0;
    }
  }

  /**
   * Get the time left until this auction ends.
   */
  get timeUntilEnd(): number {
    if (!this.auction) {
      return 0;
    }

    const now = new Date();
    const endDate = utcToDate(this.auction.endTime);

    if (now < endDate) {
      return Math.floor(Math.abs(endDate.getTime() - now.getTime()) / 1000);
    } else {
      return 0;
    }
  }

  /**
   * AuctionBidsListComponent constructor method.
   *
   * @param _bidService
   * @param _changeDetector
   * @param environment
   */
  constructor(
    private readonly _bidService: BidService,
    private readonly _changeDetector: ChangeDetectorRef,
    environment: EnvironmentConfig
  ) {
    this._pusher = new Pusher(environment.pusher.appKey, {
      cluster: environment.pusher.cluster,
    });
  }

  /** @inheritDoc */
  ngOnChanges(changes: SimpleChanges): void {
    if ('auction' in changes) {
      if (this.auction) {
        this.bids = undefined;
        this._fetchBids();

        this.bidUpdateChannel?.unsubscribe();
        this.bidUpdateChannel = this._pusher.subscribe(`auctions.${this.auction.key}`);
        this.bidUpdateChannel.bind('bids.created', () => {
          this._fetchBids();
        });

        this._timeUpdateSubscription?.unsubscribe();

        this._timeUpdateSubscription = interval(1000).pipe(
          takeWhile(() => this.timeUntilStart > 0 || this.timeUntilEnd > 0)
        ).subscribe(() => {
          this._changeDetector.detectChanges();
        });
      }
    }
  }

  /** @inheritDoc */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.bidUpdateChannel?.unsubscribe();
  }

  /**
   * Fetch a list of bids for this auction from the API.
   * @private
   */
  private _fetchBids(): void {
    if (!this.auction) {
      throw new Error('No auction set');
    }

    this._bidService.getAll(this.auction.key, new IndexOptions({
      expand: ['Buyer'],
      page: 1,
      pageSize: 3
    })).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe({
      next: response => {
        this.bids = response.items;
      }
    });
  }
}
