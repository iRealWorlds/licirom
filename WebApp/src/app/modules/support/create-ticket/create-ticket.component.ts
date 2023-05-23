import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateTicketRequest } from '@licirom/modules/support/create-ticket/create-ticket.request';
import { TicketService } from '@licirom/modules/support/ticket.service';

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

  /**
   * CreateTicketComponent constructor method.
   *
   * @param _ticketService
   * @param _router
   * @param _toastService
   */
  constructor(
    private readonly _ticketService: TicketService,
    private readonly _router: Router,
    private readonly _toastService: MatSnackBar
  ) { }

  /**
   * Submit the ticket to the API.
   */
  submitTicket(): void {
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
