import { inject } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { Observable } from 'rxjs';
import { SupportTicket } from '@licirom/modules/support/support-ticket.model';
import { TicketService } from '@licirom/modules/support/ticket.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ticketListResolver: ResolveFn<SupportTicket[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SupportTicket[]> => inject(TicketService).getAll();
