import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { EnvironmentConfig } from 'src/app/core/environment/environment-config.model';
import { Observable } from 'rxjs';
import { SupportTicket } from '@licirom/modules/support/support-ticket.model';
import { CreateTicketRequest } from '@licirom/modules/support/create-ticket/create-ticket.request';

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

  /**
   * Fetch all tickets from the API.
   */
  getAll(): Observable<SupportTicket[]> {
    return this._http.get<SupportTicket[]>(this.buildApiEndpointUri(this.environment.api.endpoints.tickets));
  }

  /**
   * Create a new ticket.
   * @param data
   */
  create(data: CreateTicketRequest): Observable<SupportTicket> {
    return this._http.post<SupportTicket>(this.buildApiEndpointUri(this.environment.api.endpoints.tickets), data);
  }
}
