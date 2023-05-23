import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '@licirom/modules/profile/profile.component';
import { RouterModule } from '@angular/router';
import { profileRouting } from '@licirom/modules/profile/profile.routing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FieldValidationErrorsComponent } from '@licirom/modules/shared/field-validation-errors/field-validation-errors.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(profileRouting),
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FieldValidationErrorsComponent,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
