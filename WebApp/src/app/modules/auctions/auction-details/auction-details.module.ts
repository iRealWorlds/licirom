import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionDetailsComponent } from '@licirom/modules/auctions/auction-details/auction-details.component';
import { RouterModule } from '@angular/router';
import { auctionDetailsRouting } from '@licirom/modules/auctions/auction-details/auction-details.routing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  AuctionCommentsModule
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comments.module';


@NgModule({
  declarations: [
    AuctionDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(auctionDetailsRouting),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    AuctionCommentsModule,
  ]
})
export class AuctionDetailsModule { }
