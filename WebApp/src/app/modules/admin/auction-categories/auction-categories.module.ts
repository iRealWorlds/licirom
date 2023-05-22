import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { auctionCategoriesRouting } from '@licirom/modules/admin/auction-categories/auction-categories.routing';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(auctionCategoriesRouting)
  ]
})
export class AuctionCategoriesModule { }
