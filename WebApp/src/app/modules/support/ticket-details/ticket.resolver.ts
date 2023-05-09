import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SupportTicket } from '../support-ticket.model';

@Injectable({
  providedIn: 'root'
})

export class TicketResolver implements Resolve<SupportTicket> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SupportTicket> {
    return of();
  }
}
