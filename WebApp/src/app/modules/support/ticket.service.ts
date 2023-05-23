import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { EnvironmentConfig } from 'src/app/core/environment/environment-config.model';
import { Observable } from 'rxjs';
import { SupportTicket } from '@licirom/modules/support/support-ticket.model';
import { CreateTicketRequest } from '@licirom/modules/support/create-ticket/create-ticket.request';
import { SupportMessage } from '@licirom/modules/support/support-messages.model';
import { MessageCreateRequest } from '@licirom/modules/support/ticket-details/message-create.request';
import { ApiOperationOptions } from '@licirom/core/api/api-operation-options.model';

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
  getAll(options = new ApiOperationOptions()): Observable<SupportTicket[]> {
    return this._http.get<SupportTicket[]>(this.buildApiEndpointUri(this.environment.api.endpoints.tickets), {
      params: this.buildParameters(options)
    });
  }

  /**
   * Create a new ticket.
   * @param data
   */
  create(data: CreateTicketRequest): Observable<SupportTicket> {
    return this._http.post<SupportTicket>(this.buildApiEndpointUri(this.environment.api.endpoints.tickets), data);
  }

  /**
   * Get a ticket's details.
   *
   * @param ticketId
   * @param options
   */
  getTicket(ticketId: string, options = new ApiOperationOptions()): Observable<SupportTicket> {
    const endpoint = `${this.environment.api.endpoints.tickets}/${ticketId}`;
    return this._http.get<SupportTicket>(this.buildApiEndpointUri(endpoint), {
      params: this.buildParameters(options)
    });
  }

  /**
   * Get a list of messages for a ticket.
   *
   * @param ticketId
   * @param options
   */
  getMessages(ticketId: string, options = new ApiOperationOptions()): Observable<SupportMessage[]> {
    const endpoint = `${this.environment.api.endpoints.tickets}/${ticketId}/messages`;
    console.log(endpoint);
    return this._http.get<SupportMessage[]>(this.buildApiEndpointUri(endpoint), {
      params: this.buildParameters(options)
    });
  }

  /**
   * Create a new message.
   *
   * @param ticketId
   * @param messageContent
   */
  createMessage(ticketId: string, messageContent: MessageCreateRequest): Observable<SupportMessage> {
    const endpoint = `${this.environment.api.endpoints.tickets}/${ticketId}/messages`;
    return this._http.post<SupportMessage>(this.buildApiEndpointUri(endpoint), messageContent);
  }

  /**
   * Mark a ticket as having been resolved.
   *
   * @param ticketId
   */
  resolveTicket(ticketId: string): Observable<boolean> {
    const endpoint = `${this.environment.api.endpoints.tickets}/${ticketId}`;
    return this._http.patch<boolean>(this.buildApiEndpointUri(endpoint), {
      resolved: true
    });
  }
}
