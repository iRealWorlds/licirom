import { Route } from '@angular/router';
import { TicketListComponent } from './ticket-list.component';
import { ticketListResolver } from './ticket-list.resolver';

export const ticketListRouting: Route[] = [
    {
        path: '',
        component: TicketListComponent,
        resolve: {
            tickets: ticketListResolver
        }
    }
];