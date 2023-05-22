import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  FieldValidationErrorsComponent
} from '@licirom/modules/shared/field-validation-errors/field-validation-errors.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  AuctionBidCreateComponent
} from '@licirom/modules/auctions/auction-details/auction-bids/auction-bid-create/auction-bid-create.component';



@NgModule({
  declarations: [
    AuctionBidCreateComponent
  ],
  exports: [
    AuctionBidCreateComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    FieldValidationErrorsComponent,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class AuctionBidCreateModule { }
