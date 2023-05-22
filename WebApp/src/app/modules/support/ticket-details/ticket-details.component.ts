import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportTicket } from '../support-ticket.model';
import { SupportMessage } from '../support-messages.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  public ticket!: SupportTicket;

  public messages!: SupportMessage[];
  constructor(private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.ticket = data['ticket'];
      this.messages = data['messages'];
    });
    console.log(this.ticket)
    console.log(this.messages)
  }

}
