import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FieldValidationErrorsComponent
} from '@licirom/modules/shared/field-validation-errors/field-validation-errors.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  AuctionCommentsComponent
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comments.component';
import {
  AuctionCommentCreateComponent
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment-create/auction-comment-create.component';
import {
  AuctionCommentComponent
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment/auction-comment.component';



@NgModule({
  declarations: [
    AuctionCommentsComponent,
    AuctionCommentCreateComponent,
    AuctionCommentComponent
  ],
  exports: [
    AuctionCommentsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FieldValidationErrorsComponent,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ]
})
export class AuctionCommentsModule { }
