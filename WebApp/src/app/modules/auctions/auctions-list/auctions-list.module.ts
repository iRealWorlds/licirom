import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { auctionsListRouting } from '@licirom/modules/auctions/auctions-list/auctions-list.routing';
import { AuctionsListComponent } from '@licirom/modules/auctions/auctions-list/auctions-list.component';



@NgModule({
  declarations: [
    AuctionsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(auctionsListRouting)
  ]
})
export class AuctionsListModule { }
