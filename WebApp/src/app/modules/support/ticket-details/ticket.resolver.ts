import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SupportTicket } from '../support-ticket.model';
import { TicketService } from '../ticket.service';

@Injectable({
  providedIn: 'root'
})
export class TicketResolver implements Resolve<SupportTicket> {
  constructor(private ticketService: TicketService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SupportTicket> {
    const ticketId = route.paramMap.get('ticketKey')!;
    return this.ticketService.getTicket(ticketId);
  }
}
