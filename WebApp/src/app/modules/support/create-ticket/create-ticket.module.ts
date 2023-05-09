import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { createTicketRouting } from './create-ticket.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTicketComponent } from './create-ticket.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
  ]
})
export class CreateTicketModule { }
