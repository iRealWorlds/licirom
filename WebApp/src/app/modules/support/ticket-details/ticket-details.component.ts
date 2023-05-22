import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportTicket } from '../support-ticket.model';
import { SupportMessage } from '../support-messages.model';
import { TicketService } from '../ticket.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuctionCreateRequest } from '@licirom/modules/auctions/auction-create.request';
import { AuctionService } from '@licirom/modules/auctions/auction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageCreateRequest } from './message-create.request';
import { async } from '@angular/core/testing';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { IdentityService } from '@licirom/core/identity/identity.service';




@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {

  ownsCurrentTicket = false;

  private readonly _unsubscribeAll = new Subject<void>();
  private _loading = false;
  get loading(): boolean {
    return this._loading;
  }
  set loading(value: boolean) {
    this._loading = value;

    if (value) {
      this.messageForm.disable();
    } else {
      this.messageForm.enable();
    }
  }

  messageForm = new FormGroup({
    messageContent: new FormControl('', { nonNullable: true })
  });

  public ticket!: SupportTicket;


  public messages!: SupportMessage[];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private readonly _identityService: IdentityService,
    private readonly _router: Router

  ) { }

  checkTicketResolvedStatus(): void {
    if (this.ticket && this.ticket.resolved === true) {
      // Perform any additional actions or update component state as needed for a resolved ticket
    }
  }

  ngOnInit(): void {

    const ticketId = this._activatedRoute.snapshot.paramMap.get('ticketKey');
    if (ticketId !== null) {
      this.ticketService.getTicket(ticketId).subscribe(
        (ticket) => {
          this.ticket = ticket;
          this.checkTicketResolvedStatus();
        },
        (error) => {
          console.error('Failed to fetch ticket:', error);
          // Perform error handling or show error messages to the user
        }
      );
    }


    this._activatedRoute.data.subscribe(async (data) => {
      this.ticket = data['ticket'];
      this.messages = data['messages'];
      const identity = await firstValueFrom(this._identityService.currentIdentity$);
      this.ownsCurrentTicket = identity?.key === this.ticket?.userId;
    });


  }


  createMessage(): void {
    if (this.loading) {
      throw new Error("Already creating an auction.");
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
          next: async () => {
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
      }
    }
  }



  resolveTicket(): void {
    const ticketId = this._activatedRoute.snapshot.paramMap.get('ticketKey');
    if (ticketId !== null) {
      this.ticketService.resolveTicket(ticketId).subscribe(
        () => {
          // Successful response handling
          console.log('Ticket resolved successfully.');
          console.log("Resolved status: " + this.ticket.resolved);
          this.ticket.resolved = true;
          // Perform any additional actions or update component state as needed
        },
        (error) => {
          // Error handling
          console.error('Failed to resolve ticket:', error);
          // Perform any error-specific actions or show error messages to the user
        }
      );
    }
  }
}