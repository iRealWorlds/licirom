import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BidService } from '@licirom/modules/auctions/auction-details/auction-bids/bid.service';
import {
  AuctionBidCreateRequest
} from '@licirom/modules/auctions/auction-details/auction-bids/auction-bid-create.request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuctionStatus } from '@licirom/modules/auctions/auction-status.enum';
import { utcToDate } from '@licirom/core/utils/utc-to-date.util';

@Component({
  selector: 'app-auction-bid-create',
  templateUrl: './auction-bid-create.component.html',
  styleUrls: ['./auction-bid-create.component.scss']
})
export class AuctionBidCreateComponent implements OnChanges {
  @Input() auction?: Auction;

  bidForm = new FormGroup({
    amount: new FormControl<number|null>(null, { validators: [Validators.required, Validators.min(0)] }),
  });

  /**
   * Check whether bidding has started on this auction.
   */
  get biddingStarted(): boolean {
    if (!this.auction) {
      return false;
    }

    if (this.auction.currentStatus !==  AuctionStatus.ACTIVE) {
      return false;
    }

    if (new Date() < utcToDate(this.auction.startTime)) {
      return false;
    }

    if (new Date() > utcToDate(this.auction.endTime)) {
      return false;
    }

    return true;
  }

  private _loading = false;

  /**
   * AuctionBidCreateComponent constructor method.
   *
   * @param _bidService
   * @param _toastService
   */
  constructor(
    private readonly _bidService: BidService,
    private readonly _toastService: MatSnackBar,
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
      this.bidForm.disable();
    } else {
      this.bidForm.enable();
    }
  }

  /** @inheritDoc */
  ngOnChanges(changes: SimpleChanges): void {
    if ('auction' in changes) {
      if (this.auction) {
        this.bidForm.controls.amount.setValidators([
          Validators.required,
          Validators.min(this.auction?.startPrice)
        ]);
        this.bidForm.controls.amount.updateValueAndValidity();
      }
    }
  }

  /**
   * Send a new bid to the API.
   */
  createBid(): void {
    // If no auction has been set, throw an error
    if (!this.auction) {
      throw new Error('No auction loaded.');
    }

    // If already loading, throw an error
    if (this.loading) {
      throw new Error('Already submitting a bid.');
    }

    // Mark the form as touched
    this.bidForm.markAllAsTouched();

    if (this.bidForm.valid) {
      // Build the request data
      const data = new AuctionBidCreateRequest({
        amount: this.bidForm.value.amount ?? 0
      });

      // Send the request
      this.loading = true;
      this._bidService.create(this.auction.key, data).subscribe({
        next: async () => {
          this._toastService.open('Bid created successfully.', 'Close');
          this.loading = false;
          this.bidForm.reset();
          this.bidForm.controls.amount.markAsPristine();
          this.bidForm.controls.amount.markAsUntouched();
        },
        error: () => {
          this.loading = false;
          this._toastService.open('Bid could not be created.', 'Close');
        }
      });
    }
  }
}
