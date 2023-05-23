import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auction } from '@licirom/modules/auctions/auction.model';
import {
  AuctionCommentCreateRequest
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment-create.request';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AuctionCommentService
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment.service';

@Component({
  selector: 'app-auction-comment-create',
  templateUrl: './auction-comment-create.component.html',
  styleUrls: ['./auction-comment-create.component.scss']
})
export class AuctionCommentCreateComponent {
  @Input() auction?: Auction;
  @Output() created = new EventEmitter<Auction>();

  commentForm = new FormGroup({
    content: new FormControl('', { validators: [Validators.required], nonNullable: true })
  });

  private _loading = false;

  /**
   * AuctionsCreateComponent constructor method.
   */
  constructor(
    private readonly _commentService: AuctionCommentService,
    private readonly _toastService: MatSnackBar
  ) {
  }

  /**
   * Get the current loading state.
   */
  get loading(): boolean {
    return this._loading;
  }

  /**
   * Set a new loading state.
   *
   * @param value
   */
  set loading(value: boolean) {
    this._loading = value;

    if (value) {
      this.commentForm.disable();
    } else {
      this.commentForm.enable();
    }
  }

  /**
   * Send the comment to the API.
   */
  saveComment(): void {
    // Make sure an auction exists
    if (!this.auction) {
      throw new Error('No auction provided.');
    }

    // If already loading, throw an error
    if (this.loading) {
      throw new Error('Already creating an auction.');
    }

    // Mark the form as touched to display validation errors
    this.commentForm.markAllAsTouched();

    if (this.commentForm.valid) {
      // Build the request data
      const data = new AuctionCommentCreateRequest({
        content: this.commentForm.controls.content.value
      });

      // Send the request
      this.loading = true;
      this._commentService.create(this.auction.key, data).subscribe({
        next: async comment => {
          this._toastService.open('Comment created successfully.', 'Close');
          this.loading = false;
          this.commentForm.reset();
          this.commentForm.controls.content.markAsPristine();
          this.commentForm.controls.content.markAsUntouched();
          this.created.emit(comment);
        },
        error: () => {
          this.loading = false;
          this._toastService.open('Comment could not be created.', 'Close');
        }
      });
    }
  }
}
