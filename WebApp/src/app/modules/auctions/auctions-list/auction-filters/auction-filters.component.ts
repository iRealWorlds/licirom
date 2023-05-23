import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuctionFilters } from '@licirom/modules/auctions/auction.filters';
import { FormControl, FormGroup } from '@angular/forms';
import { AuctionCategory } from '@licirom/modules/auctions/auction-category.model';
import { Subject, takeUntil } from 'rxjs';
import { AuctionStatus } from '@licirom/modules/auctions/auction-status.enum';
import { AuctionCategoryService } from '@licirom/modules/auctions/auction-category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auction-filters',
  templateUrl: './auction-filters.component.html',
  styleUrls: ['./auction-filters.component.scss']
})
export class AuctionFiltersComponent implements OnInit, OnDestroy {
  filters = new AuctionFilters();

  categories: AuctionCategory[] = [];
  statuses = [
    { value: AuctionStatus.ACTIVE, name: 'Active' },
    { value: AuctionStatus.CLOSED, name: 'Closed' },
    { value: AuctionStatus.PENDING, name: 'Pending' },
  ];

  filtersForm = new FormGroup({
    query: new FormControl<string>(''),
    categories: new FormControl<string[]>([]),
    statuses: new FormControl<AuctionStatus[]>([]),
    createdByMe: new FormControl<boolean>(false),
  });

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * AuctionFiltersComponent constructor method.
   *
   * @param _categoryService
   * @param _router
   * @param _activatedRoute
   */
  constructor(
    private readonly _categoryService: AuctionCategoryService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
  ) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this._categoryService.getAll().subscribe(response => {
      this.categories = response.items;
    });

    this._activatedRoute.queryParams.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe({
      next: params => {
        this.filters = AuctionFilters.fromParams(params);
        this.filtersForm.patchValue({
          query: this.filters.query,
          categories: this.filters.categoryKeys,
          statuses: this.filters.statuses,
          createdByMe: this.filters.createdByMe,
        });
      }
    });
  }

  /** @inheritDoc **/
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  /**
   * Apply the filters from the form.
   */
  async applyFilters(): Promise<void> {
    const filters = new AuctionFilters();

    if (this.filtersForm.value.query?.length) {
      filters.query = this.filtersForm.value.query;
    }

    if (this.filtersForm.value.categories?.length) {
      filters.categoryKeys = this.filtersForm.value.categories;
    }

    if (this.filtersForm.value.statuses?.length) {
      filters.statuses = this.filtersForm.value.statuses;
    }

    if (this.filtersForm.value.createdByMe) {
      filters.createdByMe = this.filtersForm.value.createdByMe;
    }

    await this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: filters.toParams()
    });
  }
}
