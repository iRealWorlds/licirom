import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ticketListRouting } from '@licirom/modules/support/ticket-list/ticket-list.routing';
import { TicketListComponent } from '@licirom/modules/support/ticket-list/ticket-list.component';



@NgModule({
  declarations: [
    TicketListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ticketListRouting)
  ]
})
export class TicketListModule { }
