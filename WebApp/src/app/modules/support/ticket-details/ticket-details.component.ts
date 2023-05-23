import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService } from '@licirom/core/identity/identity.service';
import { firstValueFrom, Subject } from 'rxjs';
import { SupportTicket } from '@licirom/modules/support/support-ticket.model';
import { SupportMessage } from '@licirom/modules/support/support-messages.model';
import { TicketService } from '@licirom/modules/support/ticket.service';
import { MessageCreateRequest } from '@licirom/modules/support/ticket-details/message-create.request';
import { User } from '@licirom/modules/users/user.model';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  messageForm = new FormGroup({
    messageContent: new FormControl('', { validators: [Validators.required], nonNullable: true })
  });

  ticket!: SupportTicket;

  messages!: SupportMessage[];

  ownsCurrentTicket = false;

  private _loading = false;

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * TicketDetailsComponent constructor method.
   *
   * @param _activatedRoute
   * @param ticketService
   * @param _identityService
   * @param _router
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private readonly _identityService: IdentityService,
    private readonly _router: Router

  ) { }

  /**
   * Get the current loading state.
   */
  get loading(): boolean {
    return this._loading;
  }

  /**
   * Set a new loading state.
   *
   * @param value
   */
  set loading(value: boolean) {
    this._loading = value;

    if (value) {
      this.messageForm.disable();
    } else {
      this.messageForm.enable();
    }
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this._activatedRoute.data.subscribe(async data => {
      this.ticket = data['ticket'];
      this.messages = data['messages'];
      const identity = await firstValueFrom(this._identityService.currentIdentity$);
      if (this.ticket) {
        if (typeof this.ticket.user === 'object') {
          this.ownsCurrentTicket = identity?.key === this.ticket.user.key;
        } else {
          this.ownsCurrentTicket = identity?.key === this.ticket?.user;
        }
      }
    });
  }

  /**
   * Send a new message to the API.
   */
  createMessage(): void {
    if (this.loading) {
      throw new Error('Already creating an auction.');
    }

    this.messageForm.markAllAsTouched();

    if (this.messageForm.valid) {
      const ticketId = this._activatedRoute.snapshot.paramMap.get('ticketKey');
      if (ticketId !== null) { // Check if ticketId is not null // Get the ticket ID from the route parameter
        const data = new MessageCreateRequest({
          messageContent: this.messageForm.controls.messageContent.value
        });

        this.loading = true;
        this.ticketService.createMessage(ticketId, data).subscribe({
          next: async message => {
            this.loading = false;
            this.messages.push(message);
            this.messageForm.reset();
          },
          error: () => {
            this.loading = false;
          }
        });
      }
    }
  }

  /**
   * Mark a ticket as having been resolved.
   */
  resolveTicket(): void {
    const ticketId = this._activatedRoute.snapshot.paramMap.get('ticketKey');
    if (ticketId !== null) {
      this.ticketService.resolveTicket(ticketId).subscribe(
        () => {
          // Successful response handling
          console.log('Ticket resolved successfully.');
          console.log('Resolved status: ' + this.ticket.resolved);
          this.ticket.resolved = true;
          // Perform any additional actions or update component state as needed
        },
        error => {
          // Error handling
          console.error('Failed to resolve ticket:', error);
          // Perform any error-specific actions or show error messages to the user
        }
      );
    }
  }

  /**
   * Display the creator's full name.
   *
   * @param user
   */
  displayCreatorName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }
}
