import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionBidsListComponent } from 'src/app/modules/auctions/auction-details/auction-bids/auction-bids-list/auction-bids-list.component';
import { MatCardModule } from '@angular/material/card';
import { ExpandablePipeModule } from '@licirom/modules/shared/expandable-pipe/expandable-pipe.module';
import {
  AuctionBidEntryComponent
} from '@licirom/modules/auctions/auction-details/auction-bids/auction-bids-list/auction-bid-entry/auction-bid-entry.component';



@NgModule({
  declarations: [
    AuctionBidsListComponent,
    AuctionBidEntryComponent
  ],
  exports: [
    AuctionBidsListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ExpandablePipeModule
  ]
})
export class AuctionBidsListModule { }
