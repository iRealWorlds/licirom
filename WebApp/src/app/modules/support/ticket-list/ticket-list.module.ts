import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ticketListRouting } from '@licirom/modules/support/ticket-list/ticket-list.routing';
import { TicketListComponent } from '@licirom/modules/support/ticket-list/ticket-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ExpandablePipeModule } from '@licirom/modules/shared/expandable-pipe/expandable-pipe.module';



@NgModule({
  declarations: [
    TicketListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ticketListRouting),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ExpandablePipeModule
  ]
})
export class TicketListModule { }
