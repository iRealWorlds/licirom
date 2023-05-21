import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { auctionsListRouting } from '@licirom/modules/auctions/auctions-list/auctions-list.routing';
import { AuctionsListComponent } from '@licirom/modules/auctions/auctions-list/auctions-list.component';
import { AuctionCardComponent } from '@licirom/modules/auctions/auctions-list/auction-card/auction-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AuctionsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(auctionsListRouting),
    AuctionCardComponent,
    MatButtonModule,
    MatIconModule,
  ]
})
export class AuctionsListModule { }
