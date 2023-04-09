import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SignUpComponent } from 'src/app/modules/auth/sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { signUpRouting } from 'src/app/modules/auth/sign-up/sign-up.routing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FieldValidationErrorsComponent
} from 'src/app/modules/shared/field-validation-errors/field-validation-errors.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(signUpRouting),
    ReactiveFormsModule,
    NgOptimizedImage,
    FieldValidationErrorsComponent,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class SignUpModule { }
