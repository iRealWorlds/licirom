import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuctionUpdateComponent } from '@licirom/modules/auctions/auction-update/auction-update.component';
import { auctionUpdateRouting } from '@licirom/modules/auctions/auction-update/auction-update.routing';
import {
  FieldValidationErrorsComponent
} from '@licirom/modules/shared/field-validation-errors/field-validation-errors.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    AuctionUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(auctionUpdateRouting),
    FieldValidationErrorsComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class AuctionUpdateModule { }
