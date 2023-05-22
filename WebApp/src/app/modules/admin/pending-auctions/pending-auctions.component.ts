import { Component, OnInit } from '@angular/core';
import { PendingAuctionsService } from '../pending-auctions.service';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { async } from '@angular/core/testing';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import * as uuid from 'uuid';

@Component({
  selector: 'app-pending-auctions',
  templateUrl: './pending-auctions.component.html',
  styleUrls: ['./pending-auctions.component.scss']
})
export class PendingAuctionsComponent implements OnInit {
  auctionList?: Auction[];

  private readonly _unsubscribeAll = new Subject<void>();
  constructor(
    private pendingAuctionService: PendingAuctionsService,
    private _activatedRoute: ActivatedRoute
  ) { }

  getAuctions(): void {
    this._activatedRoute.data.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(data => {
      console.log(data)
      if ('PendingAuctions' in data) {
        this.auctionList = data['PendingAuctions'].items;
      }
    });
  }
  ActivateAuction(auctionKey: string): void {
    console.log(auctionKey)

    this.pendingAuctionService.Activate(auctionKey).subscribe(
      () => {
        console.log("Auction activated");
        const auction = this.auctionList?.find(a => a.key === auctionKey);
        if (auction) {
          console.log("Auction name:", auction.title);
          //auction.currentStatus = "ACTIVE"
        }
      },
      error => {
        console.log("Error activating auction:", error);
      }
    );
  }




  ngOnInit(): void {

    this.getAuctions();
  }

}