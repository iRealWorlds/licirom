import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SupportTicket } from '@licirom/modules/support/support-ticket.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {

  tickets: SupportTicket[] = [];

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * TicketListComponent constructor method.
   *
   * @param _activatedRoute
   */
  constructor(private readonly _activatedRoute: ActivatedRoute) { }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    this._activatedRoute.data.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(data => {
      if ('tickets' in data) {
        this.tickets = data['tickets'];
      }
    });
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
