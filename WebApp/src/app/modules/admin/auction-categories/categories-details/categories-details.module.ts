import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { categoryDetailsRouting } from '@licirom/modules/admin/auction-categories/categories-details/category-details.routing';
import { CategoriesDetailsComponent } from '@licirom/modules/admin/auction-categories/categories-details/categories-details.component';
import { FieldValidationErrorsComponent } from '@licirom/modules/shared/field-validation-errors/field-validation-errors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    CategoriesDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(categoryDetailsRouting),
    MatSnackBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    FieldValidationErrorsComponent,
    MatIconModule
  ]
})
export class CategoriesDetailsModule { }
