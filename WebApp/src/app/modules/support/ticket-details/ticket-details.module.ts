import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketDetailsComponent } from './ticket-details.component';
import { RouterModule } from '@angular/router';
import { ticketDetailsRouting } from './ticket-details.routing';



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
