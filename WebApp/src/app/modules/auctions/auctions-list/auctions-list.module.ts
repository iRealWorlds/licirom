import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { auctionsListRouting } from '@licirom/modules/auctions/auctions-list/auctions-list.routing';
import { AuctionsListComponent } from '@licirom/modules/auctions/auctions-list/auctions-list.component';
import { AuctionCardComponent } from '@licirom/modules/auctions/auctions-list/auction-card/auction-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {
  FieldValidationErrorsComponent
} from '@licirom/modules/shared/field-validation-errors/field-validation-errors.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  AuctionFiltersComponent
} from '@licirom/modules/auctions/auctions-list/auction-filters/auction-filters.component';



@NgModule({
  declarations: [
    AuctionsListComponent,
    AuctionFiltersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(auctionsListRouting),
    AuctionCardComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FieldValidationErrorsComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
  ]
})
export class AuctionsListModule { }
