import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingAuctionsComponent } from '@licirom/modules/admin/pending-auctions/pending-auctions.component';
import { RouterModule } from '@angular/router';
import { pendingAuctionsRouting } from '@licirom/modules/admin/pending-auctions/pending-auctions.routing';



@NgModule({
  declarations: [
    PendingAuctionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pendingAuctionsRouting),
  ]
})
export class PendingAuctionsModule { }
