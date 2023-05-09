import { Route } from '@angular/router';
import { CreateTicketComponent } from './create-ticket.component';

export const createTicketRouting: Route[] = [
    {
        path: '',
        component: CreateTicketComponent
    }
];