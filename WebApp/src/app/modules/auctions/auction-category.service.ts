import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { Observable } from 'rxjs';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';
import { ApiService } from '@licirom/core/api/api.service';
import { AuctionCategory } from '@licirom/modules/auctions/auction-category.model';
import { IndexOptions } from '@licirom/core/api/index-options.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionCategoryService extends ApiService {
  /**
   * AuctionService constructor method.
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
   * Get all auctions from the API.
   */
  getAll(options = new IndexOptions()): Observable<PaginatedResult<AuctionCategory>> {
    const uri = this.buildApiEndpointUri('api/AuctionCategories');
    return this._http.get<PaginatedResult<AuctionCategory>>(uri, {
      params: this.buildParameters(options)
    });
  }
}
