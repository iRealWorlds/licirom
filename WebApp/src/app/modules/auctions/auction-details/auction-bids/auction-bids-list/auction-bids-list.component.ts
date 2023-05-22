import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Bid } from '@licirom/modules/auctions/auction-details/auction-bids/bid.model';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { BidService } from '@licirom/modules/auctions/auction-details/auction-bids/bid.service';
import { Subject, takeUntil } from 'rxjs';
import { IndexOptions } from '@licirom/core/api/index-options.model';

@Component({
  selector: 'app-auction-bids-list',
  templateUrl: './auction-bids-list.component.html',
  styleUrls: ['./auction-bids-list.component.scss']
})
export class AuctionBidsListComponent implements OnChanges, OnDestroy {
  @Input() auction?: Auction;

  bids?: Bid[];

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * AuctionBidsListComponent constructor method.
   *
   * @param _bidService
   */
  constructor(private readonly _bidService: BidService) {
  }

  /** @inheritDoc */
  ngOnChanges(changes: SimpleChanges): void {
    if ('auction' in changes) {
      if (this.auction) {
        this.bids = undefined;
        this._fetchBids();
      }
    }
  }

  /** @inheritDoc */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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
