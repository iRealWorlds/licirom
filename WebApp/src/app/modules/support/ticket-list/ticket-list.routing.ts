import { Route } from '@angular/router';
import { TicketListComponent } from '@licirom/modules/support/ticket-list/ticket-list.component';
import { ticketListResolver } from '@licirom/modules/support/ticket-list/ticket-list.resolver';

export const ticketListRouting: Route[] = [
    {
        path: '',
        component: TicketListComponent,
        resolve: {
            tickets: ticketListResolver
        }
    }
];
