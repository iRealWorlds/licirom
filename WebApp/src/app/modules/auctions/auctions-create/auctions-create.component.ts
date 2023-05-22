import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuctionCreateRequest } from '@licirom/modules/auctions/auction-create.request';
import { AuctionService } from '@licirom/modules/auctions/auction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auctions-create',
  templateUrl: './auctions-create.component.html',
  styleUrls: ['./auctions-create.component.scss']
})
export class AuctionsCreateComponent {
  auctionForm = new FormGroup({
    title: new FormControl('', { validators: [Validators.required], nonNullable: true  }),
    description: new FormControl('', { nonNullable: true })
  });

  private _loading = false;

  /**
   * AuctionsCreateComponent constructor method.
   */
  constructor(
    private readonly _auctionService: AuctionService,
    private readonly _router: Router,
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
      this.auctionForm.disable();
    } else {
      this.auctionForm.enable();
    }
  }

  /**
   * Send a request to create an auction from the current form state.
   */
  createAuction(): void {
    // If already loading, throw an error
    if (this.loading) {
      throw new Error('Already creating an auction.');
    }

    // Mark the form as touched to display validation errors
    this.auctionForm.markAllAsTouched();

    if (this.auctionForm.valid) {
      // Build the request data
      const data = new AuctionCreateRequest({
        title: this.auctionForm.controls.title.value,
        description: this.auctionForm.controls.description.value,
        categoryKey: '703966B4-7945-4898-8329-F260989ED7D6' // TODO
      });

      // Send the request
      this.loading = true;
      this._auctionService.create(data).subscribe({
        next: async () => {
          await this._router.navigate(['/auctions']);
          this._toastService.open('Auction created successfully.', 'Close');
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this._toastService.open('Auction could not be created.', 'Close');
        }
      });
    }
  }
}
