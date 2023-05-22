import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { categoryListRouting } from '@licirom/modules/admin/auction-categories/category-list/category-list.routing';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(categoryListRouting),
  ]
})
export class CategoryListModule { }
