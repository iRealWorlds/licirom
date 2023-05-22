import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { auctionCategoriesRouting } from '@licirom/modules/admin/auction-categories/auction-categories.routing';
import { CategoriesDetailsComponent } from '@licirom/modules/admin/auction-categories/categories-details/categories-details.component';
import { CategoryListComponent } from '@licirom/modules/admin/auction-categories/category-list/category-list.component';
import { CategoryCardComponent } from '@licirom/modules/admin/auction-categories/category-list/category-card/category-card.component';



@NgModule({
  declarations: [
    CategoriesDetailsComponent,
    CategoryListComponent,
    CategoryCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(auctionCategoriesRouting)
  ]
})
export class AuctionCategoriesModule { }
