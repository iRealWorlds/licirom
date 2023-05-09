import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { EnvironmentConfig } from 'src/app/core/environment/environment-config.model';
import { SupportTicket } from './support-ticket.model';
import { Observable } from 'rxjs';
import { CreateTicketRequest } from './create-ticket/create-ticket.request';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends ApiService {

  /**
   * TicketService constructor method.
   * 
   * @param environment 
   * @param _http 
   */
  constructor(
    protected override readonly environment: EnvironmentConfig,
    private readonly _http: HttpClient,
  ) {
    super(environment);
  }

  getAll(): Observable<SupportTicket[]> {
    return this._http.get<SupportTicket[]>(this.buildApiEndpointUri(this.environment.api.endpoints.tickets));
  }

  create(data: CreateTicketRequest): Observable<SupportTicket> {
    return this._http.post<SupportTicket>(this.buildApiEndpointUri(this.environment.api.endpoints.tickets), data);
  }
  getTicket(ticketId: string): Observable<SupportTicket> {
    const endpoint = `${this.environment.api.endpoints.tickets}/${ticketId}`;
    return this._http.get<SupportTicket>(this.buildApiEndpointUri(endpoint));
  }
}