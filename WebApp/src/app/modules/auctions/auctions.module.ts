import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { auctionsRouting } from '@licirom/modules/auctions/auctions.routing';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(auctionsRouting)
  ]
})
export class AuctionsModule { }
