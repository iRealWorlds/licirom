import { inject } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TicketService } from '../ticket.service';
import { SupportTicket } from '../support-ticket.model';

export const ticketListResolver: ResolveFn<SupportTicket[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SupportTicket[]> => inject(TicketService).getAll();