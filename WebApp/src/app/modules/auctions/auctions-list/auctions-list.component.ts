import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Auction } from '@licirom/modules/auctions/auction.model';

@Component({
  selector: 'app-auctions-list',
  templateUrl: './auctions-list.component.html',
  styleUrls: ['./auctions-list.component.scss']
})
export class AuctionsListComponent implements OnInit, OnDestroy {
  auctions?: Auction[];

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * AuctionsListComponent constructor method.
   */
  constructor(
    private readonly _activatedRoute: ActivatedRoute
  ) {
  }

  /** @inheritDoc **/
  ngOnInit(): void {
    this._activatedRoute.data.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(data => {
      if ('auctions' in data) {
        this.auctions = data['auctions'].items;
      }
    });
  }

  /** @inheritDoc **/
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
