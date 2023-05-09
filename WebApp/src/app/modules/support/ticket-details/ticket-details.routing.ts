import { Route } from '@angular/router';
import { TicketDetailsComponent } from './ticket-details.component';



export const ticketDetailsRouting: Route[] = [

    {
        path: ':ticketKey',
        component: TicketDetailsComponent
    }



];
