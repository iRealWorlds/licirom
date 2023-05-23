import { Injectable } from '@angular/core';
import {
  Resolve,
} from '@angular/router';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';
import { Observable } from 'rxjs';
import { AuctionCategoryModel } from '@licirom/modules/admin/auction-categories/auction-category.model';
import { AuctionCategoriesService } from '@licirom/modules/admin/auction-categories/auction-categories.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryListResolver implements Resolve<PaginatedResult<AuctionCategoryModel>> {
  /**
   * Constructor of CategoryListResolver
   * @param _auctionService
   */
  constructor(
    private readonly _auctionService: AuctionCategoriesService
  ) {
  }

  /**
   *
   **/
  resolve(): Observable<PaginatedResult<AuctionCategoryModel>> {
    return this._auctionService.getAll();
  }
}
