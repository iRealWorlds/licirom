import { Injectable } from '@angular/core';
import { ApiService } from '@licirom/core/api/api.service';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { Observable } from 'rxjs';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';
import { AuctionCreateRequest } from '@licirom/modules/auctions/auction-create.request';
import { AuctionUpdateRequest } from '@licirom/modules/auctions/auction-update.request';
import { ApiOperationOptions } from '@licirom/core/api/api-operation-options.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionService extends ApiService {
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
  getAll(options = new ApiOperationOptions()): Observable<PaginatedResult<Auction>> {
    const uri = this.buildApiEndpointUri('api/Auctions');
    return this._http.get<PaginatedResult<Auction>>(uri, {
      params: this.buildParameters(options)
    });
  }

  /**
   * Create a new auction.
   *
   * @param data
   * @param options
   */
  create(data: AuctionCreateRequest, options = new ApiOperationOptions()): Observable<Auction> {
    const uri = this.buildApiEndpointUri('api/Auctions');
    return this._http.post<Auction>(uri, data, {
      params: this.buildParameters(options)
    });
  }

  /**
   * Get a single auction from the API.
   *
   * @param auctionKey
   * @param options
   */
  getByKey(auctionKey: string, options = new ApiOperationOptions()): Observable<Auction> {
    const uri = this.buildApiEndpointUri(['api', 'Auctions', auctionKey]);
    return this._http.get<Auction>(uri, {
      params: this.buildParameters(options)
    });
  }

  /**
   * Delete the given auction from the API.
   *
   * @param auctionKey
   */
  deleteByKey(auctionKey: string): Observable<void> {
    const uri = this.buildApiEndpointUri(['api', 'Auctions', auctionKey]);
    return this._http.delete<void>(uri);
  }

  /**
   * Update an auction in the API.
   *
   * @param auctionKey
   * @param data
   * @param options
   */
  updateByKey(auctionKey: string, data: AuctionUpdateRequest, options = new ApiOperationOptions()): Observable<Auction> {
    const uri = this.buildApiEndpointUri(['api', 'Auctions', auctionKey]);
    return this._http.patch<Auction>(uri, data, {
      params: this.buildParameters(options)
    });
  }
}
