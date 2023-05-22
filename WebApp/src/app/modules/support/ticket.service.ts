import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { EnvironmentConfig } from 'src/app/core/environment/environment-config.model';
//import { SupportTicket } from './support-ticket.model';
import { SupportMessage } from './support-messages.model';
import { Observable } from 'rxjs';
import { SupportTicket } from '@licirom/modules/support/support-ticket.model';
import { CreateTicketRequest } from '@licirom/modules/support/create-ticket/create-ticket.request';
import { MessageCreateRequest } from './ticket-details/message-create.request';

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

  getTicket(ticketId: string): Observable<SupportTicket> {
    const endpoint = `${this.environment.api.endpoints.tickets}/${ticketId}`;
    return this._http.get<SupportTicket>(this.buildApiEndpointUri(endpoint));
  }

  getMessages(ticketId: string): Observable<SupportMessage[]> {
    const endpoint = `${this.environment.api.endpoints.tickets}/${ticketId}/all`;
    console.log(endpoint);
    return this._http.get<SupportMessage[]>(this.buildApiEndpointUri(endpoint))
  }

  createMessage(ticketId: string, messageContent: MessageCreateRequest): Observable<SupportMessage> {
    const endpoint = `${this.environment.api.endpoints.tickets}/${ticketId}/addMessage`;
    return this._http.post<SupportMessage>(this.buildApiEndpointUri(endpoint), messageContent);
  }

  resolveTicket(ticketId: string): Observable<boolean> {
    const endpoint = `${this.environment.api.endpoints.tickets}/${ticketId}/resolve`;
    return this._http.put<boolean>(this.buildApiEndpointUri(endpoint), {});
  }

  // isResolved(ticketId: string): Observable<boolean> {
  //   const endpoint = `${this.environment.api.endpoints.tickets}/${ticketId}/isResolved`;
  //   return this._http.get<boolean>(this.buildApiEndpointUri(endpoint));

  // }


}