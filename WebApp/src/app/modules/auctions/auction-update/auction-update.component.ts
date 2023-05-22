import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '@licirom/modules/auctions/auction.service';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuctionUpdateRequest } from '@licirom/modules/auctions/auction-update.request';

@Component({
  selector: 'app-auction-update',
  templateUrl: './auction-update.component.html',
  styleUrls: ['./auction-update.component.scss']
})
export class AuctionUpdateComponent implements OnInit, OnDestroy {
  auction?: Auction;

  auctionForm = new FormGroup({
    title: new FormControl('', { validators: [Validators.required], nonNullable: true  }),
    description: new FormControl('', { nonNullable: true })
  });

  private _loading = false;

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * AuctionUpdateComponent constructor method.
   *
   * @param _activatedRoute
   * @param _auctionService
   * @param _router
   * @param _toastService
   */
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _auctionService: AuctionService,
    private readonly _router: Router,
    private readonly _toastService: MatSnackBar
  ) {}

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
      this.auctionForm.disable();
    } else {
      this.auctionForm.enable();
    }
  }

  /** @inheritDoc */
  ngOnInit(): void {

    this._activatedRoute.data.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe (async data => {
      if('auction' in data) {
        this.auction = data['auction'];

        if (this.auction) {
          this.auctionForm.setValue({
            title: this.auction.title,
            description: this.auction.description ?? ''
          });
        }
      }
    });

  }


  /** @inheritDoc **/
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * Update the auction.
   */
  updateAuction(): void {
    // Make sure an auction exists
    if (!this.auction) {
      throw new Error('No auction provided.');
    }

    // If already loading, throw an error
    if (this.loading) {
      throw new Error('Already creating an auction.');
    }

    // Mark the form as touched to display validation errors
    this.auctionForm.markAllAsTouched();


    if (this.auctionForm.valid) {
      // Build the request data
      const data = new AuctionUpdateRequest({
        title: this.auctionForm.controls.title.value,
        description: this.auctionForm.controls.description.value,
      });

      // Send the request
      this.loading = true;
      this._auctionService.updateByKey(this.auction.key, data).subscribe({
        next: async auction => {
          await this._router.navigate(['/auctions/details', auction.key]);
          this._toastService.open('Auction updated successfully.', 'Close');
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this._toastService.open('Auction could not be updated.', 'Close');
        }
      });
    }
  }
}
