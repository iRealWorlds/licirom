import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesCreateComponent } from '@licirom/modules/admin/auction-categories/categories-create/categories-create.component';
import { RouterModule } from '@angular/router';
import { categoriesCreateRouting } from '@licirom/modules/admin/auction-categories/categories-create/categories-create.routing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FieldValidationErrorsComponent } from '@licirom/modules/shared/field-validation-errors/field-validation-errors.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CategoriesCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(categoriesCreateRouting),
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
export class CategoriesCreateModule { }
