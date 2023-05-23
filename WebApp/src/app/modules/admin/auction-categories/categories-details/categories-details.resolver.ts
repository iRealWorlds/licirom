import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuctionCategoryModel } from '@licirom/modules/admin/auction-categories/auction-category.model';
import { AuctionCategoriesService  } from '@licirom/modules/admin/auction-categories/auction-categories.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesDetailsResolver implements Resolve<AuctionCategoryModel> {
  /**
   * CategoryDetailsResolver constructor method.
   *
   * @param _categoryService
   */
  constructor(
    private readonly _categoryService: AuctionCategoriesService 
  ) {
  }

  /**
   * Resolve data from the API.
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AuctionCategoryModel> {// eslint-disable-line @typescript-eslint/no-unused-vars
    const categoryKey = route.paramMap.get('categoryKey');

    if (!categoryKey) {
      throw new Error('Invalid category key');
    }

    return this._categoryService.getByKey(categoryKey);
  }
}
