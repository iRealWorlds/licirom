import { Route } from '@angular/router';
import { TicketDetailsComponent } from '@licirom/modules/support/ticket-details/ticket-details.component';
import { MessagesResolver, TicketResolver } from '@licirom/modules/support/ticket-details/ticket.resolver';


export const ticketDetailsRouting: Route[] = [
  {
    path: ':ticketKey',
    component: TicketDetailsComponent,
    resolve: {
      ticket: TicketResolver,
      messages: MessagesResolver
    }
  }
];
