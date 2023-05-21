import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss']
})
export class AuctionDetailsComponent implements OnInit, OnDestroy {
  auction?: Auction;

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * AuctionDetailsComponent constructor method.
   *
   * @param _activatedRoute
   */
  constructor(
    private readonly _activatedRoute: ActivatedRoute
  ) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this._activatedRoute.data.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(data => {
      if ('auction' in data) {
        this.auction = data['auction'];
      }
    });
  }

  /** @inheritDoc **/
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
