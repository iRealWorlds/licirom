import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';
import { Observable, of } from 'rxjs';
import { AuctionCategoryModel } from '../auction-category.model';
import { AdminCategoriesService } from '@licirom/modules/admin/auction-categories/auction-categories.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryListResolver implements Resolve<PaginatedResult<AuctionCategoryModel>> {
  
  constructor(
    private readonly _auctionService: AdminCategoriesService
  ){
    
  }

  /**
   * 
   **/
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<AuctionCategoryModel>> {
    return this._auctionService.getAll();
  }
}
