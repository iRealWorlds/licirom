import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SupportTicket } from '../support-ticket.model';
import { SupportMessage } from '../support-messages.model';
import { TicketService } from '../ticket.service';

@Injectable({ providedIn: 'root' })
export class TicketResolver implements Resolve<SupportTicket> {
  constructor(private ticketService: TicketService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<SupportTicket> {
    const ticketId = route.paramMap.get('ticketKey');
    return this.ticketService.getTicket(ticketId!);
  }
}

@Injectable({ providedIn: 'root' })
export class MessagesResolver implements Resolve<SupportMessage[]> {
  constructor(private ticketService: TicketService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<SupportMessage[]> {
    const ticketId = route.paramMap.get('ticketKey');
    return this.ticketService.getMessages(ticketId!);
  }
}
