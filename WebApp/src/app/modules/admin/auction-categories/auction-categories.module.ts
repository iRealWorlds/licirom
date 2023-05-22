import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { auctionCategoriesRouting } from './auction-categories.routing';
import { CategoriesDetailsComponent } from './categories-details/categories-details.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCardComponent } from './category-list/category-card/category-card.component';



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
