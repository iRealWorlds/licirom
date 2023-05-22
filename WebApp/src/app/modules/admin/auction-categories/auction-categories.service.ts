import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@licirom/core/api/api.service';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';
import { AuctionCategoryModel } from '@licirom/modules/admin/auction-categories/auction-category.model';
import { Observable } from 'rxjs';
import { AuctionCategoryCreateRequest } from '@licirom/modules/admin/auction-categories//auction-category-create.request';
import { AuctionCategoryUpdateRequest } from '@licirom/modules/auctions/auction-category-update.request';

@Injectable({
  providedIn: 'root'
})
export class AuctionCategoriesService extends ApiService{

  /**
   * AuctionCategory Service constructor method.
   *
   * @param _http
   * @param environment
   */
  constructor(
    private readonly _http: HttpClient,
    protected override readonly environment: EnvironmentConfig
  ) {
    super(environment);
  }

  /**
   * Get all auction-categories from the API.
   */
  getAll(): Observable<PaginatedResult<AuctionCategoryModel>> {
    const uri = this.buildApiEndpointUri('api/AuctionCategories');
    return this._http.get<PaginatedResult<AuctionCategoryModel>>(uri);
  }

  /**
   * Create a new auction category.
   *
   * @param data
   */
  create(data: AuctionCategoryCreateRequest): Observable<AuctionCategoryModel> {
    const uri = this.buildApiEndpointUri('api/AuctionCategories');
    return this._http.post<AuctionCategoryModel>(uri, data);
  }

  /**
   * Get a single auction category from the API.
   *
   * @param categoryKey
   */
  getByKey(categoryKey: string): Observable<AuctionCategoryModel> {
    const uri = this.buildApiEndpointUri(['api', 'AuctionCategories', categoryKey]);
    return this._http.get<AuctionCategoryModel>(uri);
  }

  /**
   * Get a single auction category from the API.
   *
   * @param categoryKey
   */
  updateByKey(categoryKey: string, data: AuctionCategoryUpdateRequest): Observable<AuctionCategoryModel> {
    const uri = this.buildApiEndpointUri(['api', 'AuctionCategories', categoryKey]);
    return this._http.put<AuctionCategoryModel>(uri,data);
  }

  /**
   * Delete the given auction category from the API.
   *
   * @param categoryKey
   */
  deleteByKey(categoryKey: string): Observable<void> {
    const uri = this.buildApiEndpointUri(['api', 'AuctionCategories', categoryKey]);
    return this._http.delete<void>(uri);
  }

}

