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

  private _loading = false;

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
   * Get the current loading state for this component.
   */
  get loading(): boolean {
    return this._loading;
  }

  /**
   * Set a new loading state for this component.
   *
   * @param value
   */
  set loading(value: boolean) {
    this._loading = value;

    if (value) {
      this.ticketForm.disable();
    } else {
      this.ticketForm.enable();
    }
  }

  /**
   * Submit the ticket to the API.
   */
  submitTicket(): void {
    // If already loading, throw an exception
    if (this.loading) {
      throw new Error('Already loading.');
    }

    this.ticketForm.markAllAsTouched();

    if (this.ticketForm.valid) {
      this.loading = true;
      this._ticketService.create(new CreateTicketRequest(this.ticketForm.value)).subscribe({
        next: async () => {
          await this._router.navigate(['/support']);
          this._toastService.open('Ticket created successfully.', 'Close');
          this.loading = false;
        },
        error: () => {
          this._toastService.open('An error has occurred.', 'Close');
          this.loading = false;
        }
      });
    }
  }
}
