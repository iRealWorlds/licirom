import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuctionCategoryModel } from '@licirom/modules/admin/auction-categories/auction-category.model';
import { AuctionCategoriesService } from '@licirom/modules/admin/auction-categories/auction-categories.service';

@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.scss']
})
export class CategoriesDetailsComponent implements OnInit, OnDestroy {
  category?: AuctionCategoryModel;
  ownsCurrentAuction = false;

  deleting = false;

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * AuctionDetailsComponent constructor method.
   *
   * @param _activatedRoute
   * @param _identityService
   * @param _auctionService
   * @param _toastService
   * @param _router
   */
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _categoryService: AuctionCategoriesService,
    private readonly _toastService: MatSnackBar,
    private readonly _router: Router,
  ) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    // Load auction data
    this._activatedRoute.data.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(async data => {
      if ('category' in data) {
        this.category = data['category'];
      }
    });
  }

  /** @inheritDoc **/
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * Delete the current auction.
   */
  deleteCategory(): void {
    // Make sure an auction exists
    if (!this.category) {
      throw new Error('No category provided.');
    }

    // Make sure the auction is not already being deleted
    if (this.deleting) {
      throw new Error('Already deleting a category.');
    }

    // Set the deleting flag
    this.deleting = true;

    // Send the request to the API
    this._categoryService.deleteByKey(this.category.key).subscribe({
      next: async () => {
        await this._router.navigate(['/admin/categories']);
        this._toastService.open('Category deleted successfully', 'Close');
      },
      error: () => {
        this._toastService.open('An error has occurred. Please try again!', 'Close');
        this.deleting = false;
      }
    });
  }
}
