import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from './ticket-list.component';
import { RouterModule } from '@angular/router';
import { ticketListRouting } from './ticket-list.routing';



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
