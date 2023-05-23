import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ticketDetailsRouting } from '@licirom/modules/support/ticket-details/ticket-details.routing';
import { TicketDetailsComponent } from '@licirom/modules/support/ticket-details/ticket-details.component';



@NgModule({
  declarations: [
    TicketDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ticketDetailsRouting)
  ]
})
export class TicketDetailsModule { }
