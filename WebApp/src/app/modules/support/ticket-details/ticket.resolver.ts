import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { SupportTicket } from '@licirom/modules/support/support-ticket.model';
import { TicketService } from '@licirom/modules/support/ticket.service';
import { SupportMessage } from '@licirom/modules/support/support-messages.model';

@Injectable({ providedIn: 'root' })
export class TicketResolver implements Resolve<SupportTicket> {
  /**
   * TicketResolver constructor method.
   *
   * @param ticketService
   */
  constructor(private ticketService: TicketService) { }

  /**
   * Resolve the data from the API.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<SupportTicket> {
    const ticketId = route.paramMap.get('ticketKey');
    if (ticketId === null) {
      return throwError(() => new Error('No ticket id provided'));
    }
    return this.ticketService.getTicket(ticketId);
  }
}

@Injectable({ providedIn: 'root' })
export class MessagesResolver implements Resolve<SupportMessage[]> {
  /**
   * MessagesResolver constructor method.
   *
   * @param ticketService
   */
  constructor(private ticketService: TicketService) { }

  /**
   * Resolve the data from the API.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<SupportMessage[]> {
    const ticketId = route.paramMap.get('ticketKey');
    if (ticketId === null) {
      return throwError(() => new Error('No ticket id provided'));
    }
    return this.ticketService.getMessages(ticketId);
  }
}
