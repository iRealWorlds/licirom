import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SignInComponent } from '@licirom/modules/auth/sign-in/sign-in.component';
import { RouterModule } from '@angular/router';
import { signInRouting } from '@licirom/modules/auth/sign-in/sign-in.routing';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  FieldValidationErrorsComponent
} from '@licirom/modules/shared/field-validation-errors/field-validation-errors.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(signInRouting),
    ReactiveFormsModule,
    FieldValidationErrorsComponent,

    // Angular material
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    NgOptimizedImage,
  ]
})
export class SignInModule { }
