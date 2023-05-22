import { Component, OnInit } from '@angular/core';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PendingAuctionsService } from '@licirom/modules/admin/pending-auctions.service';

@Component({
  selector: 'app-pending-auctions',
  templateUrl: './pending-auctions.component.html',
  styleUrls: ['./pending-auctions.component.scss']
})
export class PendingAuctionsComponent implements OnInit {
  auctionList?: Auction[];

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * PendingAuctionsComponent constructor method.
   *
   * @param pendingAuctionService
   * @param _activatedRoute
   */
  constructor(
    private pendingAuctionService: PendingAuctionsService,
    private _activatedRoute: ActivatedRoute
  ) { }

  /**
   * Get all auctions.
   */
  getAuctions(): void {
    this._activatedRoute.data.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(data => {
      if ('PendingAuctions' in data) {
        this.auctionList = data['PendingAuctions'].items;
      }
    });
  }

  /**
   * Activate an auction.
   *
   * @param auctionKey
   * @constructor
   */
  ActivateAuction(auctionKey: string): void {
    console.log(auctionKey);

    this.pendingAuctionService.Activate(auctionKey).subscribe(
      () => {
        const auction = this.auctionList?.find(a => a.key === auctionKey);
        if (auction) {
          // Do nothing
        }
      },
      error => {
        console.log('Error activating auction:', error);
      }
    );
  }

  /** @inheritDoc */
  ngOnInit(): void {

    this.getAuctions();
  }

}
