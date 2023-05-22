import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { categoryListRouting } from '@licirom/modules/admin/auction-categories/category-list/category-list.routing';
import { CategoryListComponent } from '@licirom/modules/admin/auction-categories/category-list/category-list.component';
import { CategoryCardComponent } from '@licirom/modules/admin/auction-categories/category-list/category-card/category-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(categoryListRouting),
    CategoryCardComponent,
    MatButtonModule,
    MatIconModule,
  ]
})
export class CategoryListModule { }
