import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from '../ticket.service';
import { CreateTicketRequest } from './create-ticket.request';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent {
  ticketForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    content: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });
  constructor(
    private readonly _ticketService: TicketService,
    private readonly _router: Router,
    private readonly _toastService: MatSnackBar
  ) { }

  submitTicket() {
    this.ticketForm.markAllAsTouched();

    if (this.ticketForm.valid) {
      this._ticketService.create(new CreateTicketRequest(this.ticketForm.value)).subscribe({
        next: async () => {
          await this._router.navigate(['/support']);
          this._toastService.open('Ticket created successfully.', 'Close');
        },
        error: () => {
          this._toastService.open('An error has occurred.', 'Close');
        }
      });
    }
  }
}
