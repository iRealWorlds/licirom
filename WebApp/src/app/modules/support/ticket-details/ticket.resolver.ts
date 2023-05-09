import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SupportTicket } from '@licirom/modules/support/support-ticket.model';

@Injectable({
  providedIn: 'root'
})

export class TicketResolver implements Resolve<SupportTicket> {
  /**
   * Resolve the ticket details from the API.
   *
   * @param route
   * @param state
   *
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SupportTicket> { // eslint-disable-line @typescript-eslint/no-unused-vars
    return of();
  }
}
