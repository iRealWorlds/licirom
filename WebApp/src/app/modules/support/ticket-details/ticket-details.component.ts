import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportTicket } from '../support-ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  public ticket!: SupportTicket;

  constructor(private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit(): void {
    const ticketKey = this.route.snapshot.paramMap.get('ticketKey')!;
    this.ticketService.getTicket(ticketKey).subscribe(ticket => {
      this.ticket = ticket;
    });
  }
}
