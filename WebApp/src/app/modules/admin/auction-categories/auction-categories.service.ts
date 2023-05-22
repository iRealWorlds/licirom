import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@licirom/core/api/api.service';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';
import { AuctionCategoryModel } from './auction-category.model';
import { Observable } from 'rxjs';
import { AuctionCreateRequest } from '@licirom/modules/auctions/auction-create.request';
import { AuctionCategoryUpdateRequest } from './auction-category-update.requests';
import { AuctionCategoryCreateRequest } from './auction-category-create.request';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoriesService extends ApiService{

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
   * @param auctionKey
   */
  getByKey(auctionKey: string): Observable<AuctionCategoryModel> {
    const uri = this.buildApiEndpointUri(['api', 'AuctionCategories', auctionKey]);
    return this._http.get<AuctionCategoryModel>(uri);
  }

  /**
   * Delete the given auction category from the API.
   *
   * @param auctionKey
   */
  deleteByKey(auctionKey: string): Observable<void> {
    const uri = this.buildApiEndpointUri(['api', 'AuctionCategories', auctionKey]);
    return this._http.delete<void>(uri);
  }

  /**
   * Update an auction in the API.
   *
   * @param auctionKey
   * @param data
   */
  updateByKey(auctionKey: string, data: AuctionCategoryUpdateRequest): Observable<AuctionCategoryModel> {
    const uri = this.buildApiEndpointUri(['api', 'Auctions', auctionKey]);
    return this._http.put<AuctionCategoryModel>(uri, data);
  }
}

