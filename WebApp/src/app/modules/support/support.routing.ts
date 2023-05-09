import { Route } from '@angular/router';

export const supportRouting: Route[] = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', loadChildren: () => import('./ticket-list/ticket-list.module').then(m => m.TicketListModule) },
    { path: 'create', loadChildren: () => import('./create-ticket/create-ticket.module').then(m => m.CreateTicketModule) },
    { path: 'details', loadChildren: () => import('./ticket-details/ticket-details.module').then(m => m.TicketDetailsModule) }
];