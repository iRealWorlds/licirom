import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Bid } from '@licirom/modules/auctions/auction-details/auction-bids/bid.model';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { BidService } from '@licirom/modules/auctions/auction-details/auction-bids/bid.service';
import { Subject, takeUntil } from 'rxjs';
import { IndexOptions } from '@licirom/core/api/index-options.model';
import Pusher, { Channel } from 'pusher-js';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';

@Component({
  selector: 'app-auction-bids-list',
  templateUrl: './auction-bids-list.component.html',
  styleUrls: ['./auction-bids-list.component.scss']
})
export class AuctionBidsListComponent implements OnChanges, OnDestroy {
  @Input() auction?: Auction;

  bids?: Bid[];

  bidUpdateChannel?: Channel;

  private readonly _unsubscribeAll = new Subject<void>();
  private readonly _pusher: Pusher;

  /**
   * AuctionBidsListComponent constructor method.
   *
   * @param _bidService
   * @param environment
   */
  constructor(
    private readonly _bidService: BidService,
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
