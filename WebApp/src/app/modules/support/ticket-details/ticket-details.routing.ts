import { Route } from '@angular/router';
import { TicketDetailsComponent } from './ticket-details.component';
import { TicketResolver, MessagesResolver } from './ticket.resolver';


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