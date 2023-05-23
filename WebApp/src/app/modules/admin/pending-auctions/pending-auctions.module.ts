import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingAuctionsComponent } from '@licirom/modules/admin/pending-auctions/pending-auctions.component';
import { RouterModule } from '@angular/router';
import { pendingAuctionsRouting } from '@licirom/modules/admin/pending-auctions/pending-auctions.routing';
import { AuctionCardComponent } from '@licirom/modules/auctions/auctions-list/auction-card/auction-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    PendingAuctionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pendingAuctionsRouting),
    AuctionCardComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ]
})
export class PendingAuctionsModule { }
