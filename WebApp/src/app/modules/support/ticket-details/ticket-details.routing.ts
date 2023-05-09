import { Route } from '@angular/router';
import { TicketDetailsComponent } from '@licirom/modules/support/ticket-details/ticket-details.component';

export const ticketDetailsRouting: Route[] = [
    {
        path: ':ticketKey',
        component: TicketDetailsComponent
    }
];
