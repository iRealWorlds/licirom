import { Route } from '@angular/router';
import { CreateTicketComponent } from '@licirom/modules/support/create-ticket/create-ticket.component';

export const createTicketRouting: Route[] = [
    {
        path: '',
        component: CreateTicketComponent
    }
];
