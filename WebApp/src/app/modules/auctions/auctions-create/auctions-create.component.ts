import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuctionCreateRequest } from '@licirom/modules/auctions/auction-create.request';
import { AuctionService } from '@licirom/modules/auctions/auction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuctionCategory } from '@licirom/modules/auctions/auction-category.model';
import { AuctionCategoryService } from '@licirom/modules/auctions/auction-category.service';
import { AuctionCategoryFilters } from '@licirom/modules/auctions/auction-category.filters';
import { IndexOptions } from '@licirom/core/api/index-options.model';

@Component({
  selector: 'app-auctions-create',
  templateUrl: './auctions-create.component.html',
  styleUrls: ['./auctions-create.component.scss']
})
export class AuctionsCreateComponent {
  auctionForm = new FormGroup({
    title: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    description: new FormControl<string>('', { nonNullable: true }),
    category: new FormControl<AuctionCategory|undefined>(undefined, { validators: [Validators.required], nonNullable: true }),
    reservePrice: new FormControl<number>(0, { validators: [Validators.required, Validators.min(0)], nonNullable: true }),
    minimumIncrement: new FormControl<number>(0, { validators: [Validators.required, Validators.min(0)], nonNullable: true }),
    startPrice: new FormControl<number>(0, { validators: [Validators.required, Validators.min(0)], nonNullable: true }),
    startTime: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    endTime: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
  });

  private _loading = false;

  /**
   * AuctionsCreateComponent constructor method.
   */
  constructor(
    private readonly _auctionService: AuctionService,
    private readonly _categoryService: AuctionCategoryService,
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
        categoryKey: this.auctionForm.controls.category.value?.key,
        reservePrice: this.auctionForm.controls.reservePrice.value,
        minimumIncrement: this.auctionForm.controls.minimumIncrement.value,
        startPrice: this.auctionForm.controls.startPrice.value,
        startTime: new Date(this.auctionForm.controls.startTime.value).toISOString(),
        endTime: new Date(this.auctionForm.controls.endTime.value).toISOString(),
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

  /**
   * Search the auction categories by the given {@link query}.
   *
   * @param query
   */
  searchCategories(query: string): Observable<AuctionCategory[]> {
    return this._categoryService.getAll(new IndexOptions<AuctionCategoryFilters>({
      filters: new AuctionCategoryFilters({
        query
      })
    })).pipe(
      map(response => response.items)
    );
  }

  /**
   * Format the given category to be displayed as a suggestion.
   */
  formatCategorySuggestion(category: AuctionCategory): string {
    return category.name;
  }
}
