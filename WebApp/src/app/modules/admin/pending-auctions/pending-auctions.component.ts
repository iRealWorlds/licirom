import { Component, OnInit } from '@angular/core';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PendingAuctionsService } from '@licirom/modules/admin/pending-auctions/pending-auctions.service';

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
  activateAuction(auctionKey: string): void {
    this.pendingAuctionService.Activate(auctionKey).subscribe(
      () => {
        if (this.auctionList) {
          const index = this.auctionList?.findIndex(a => a.key === auctionKey);
          if (index !== -1) {
            this.auctionList.splice(index, 1);
          }
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
