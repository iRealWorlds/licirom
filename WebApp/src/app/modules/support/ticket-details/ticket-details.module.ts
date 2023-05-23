import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ticketDetailsRouting } from '@licirom/modules/support/ticket-details/ticket-details.routing';
import { TicketDetailsComponent } from '@licirom/modules/support/ticket-details/ticket-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FieldValidationErrorsComponent } from '@licirom/modules/shared/field-validation-errors/field-validation-errors.component';

@NgModule({
  declarations: [
    TicketDetailsComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ticketDetailsRouting),
    CommonModule,
    ReactiveFormsModule,
    FieldValidationErrorsComponent,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ]
})
export class TicketDetailsModule { }
