import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FieldValidationErrorsComponent } from '@licirom/modules/shared/field-validation-errors/field-validation-errors.component';
import { userUpdateRouting } from '@licirom/modules/profile/profile-update/profile-update.routing';
import { ProfileUpdateComponent } from '@licirom/modules/profile/profile-update/profile-update.component';



@NgModule({
  declarations: [
    ProfileUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userUpdateRouting),
    FieldValidationErrorsComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class ProfileUpdateModule { }
