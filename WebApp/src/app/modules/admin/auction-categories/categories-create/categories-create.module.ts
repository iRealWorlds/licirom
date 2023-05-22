import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesCreateComponent } from './categories-create.component';
import { RouterModule } from '@angular/router';
import { categoriesCreateRouting } from './categories-create.routing';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    CategoriesCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(categoriesCreateRouting),
    MatSnackBarModule,
  ]
})
export class CategoriesCreateModule { }
