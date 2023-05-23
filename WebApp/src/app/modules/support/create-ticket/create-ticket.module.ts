import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { createTicketRouting } from '@licirom/modules/support/create-ticket/create-ticket.routing';
import { CreateTicketComponent } from '@licirom/modules/support/create-ticket/create-ticket.component';
import { MatButtonModule } from '@angular/material/button';
import {
  FieldValidationErrorsComponent
} from '@licirom/modules/shared/field-validation-errors/field-validation-errors.component';

@NgModule({
  declarations: [
    CreateTicketComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(createTicketRouting),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    FieldValidationErrorsComponent,
  ]
})
export class CreateTicketModule { }
