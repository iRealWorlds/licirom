import { inject } from '@angular/core';
import {
  ResolveFn
} from '@angular/router';
import { Observable } from 'rxjs';
import { SupportTicket } from '@licirom/modules/support/support-ticket.model';
import { TicketService } from '@licirom/modules/support/ticket.service';
import { ApiOperationOptions } from '@licirom/core/api/api-operation-options.model';

export const ticketListResolver: ResolveFn<SupportTicket[]> = (): Observable<SupportTicket[]> =>
  inject(TicketService).getAll(new ApiOperationOptions({
    expand: ['User']
  }));
