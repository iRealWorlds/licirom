import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TicketService } from '../ticket.service';
import { SupportTicket } from '../support-ticket.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {

  tickets: SupportTicket[] = [];

  private readonly _unsubscribeAll = new Subject<void>();

  constructor(private readonly _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.data.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(data => {
      if ('tickets' in data) {
        this.tickets = data['tickets'];
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
