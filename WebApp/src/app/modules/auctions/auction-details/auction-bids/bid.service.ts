import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { Observable } from 'rxjs';
import { ApiService } from '@licirom/core/api/api.service';
import { Bid } from '@licirom/modules/auctions/auction-details/auction-bids/bid.model';
import {
  AuctionBidCreateRequest
} from '@licirom/modules/auctions/auction-details/auction-bids/auction-bid-create.request';
import { ApiOperationOptions } from '@licirom/core/api/api-operation-options.model';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class BidService extends ApiService {
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
   * Get all bids from the API.
   */
  getAll(auctionKey: string, options = new ApiOperationOptions()): Observable<PaginatedResult<Bid>> {
    const uri = this.buildApiEndpointUri(['api', 'Auctions', auctionKey, 'Bids']);
    return this._http.get<PaginatedResult<Bid>>(uri, {
      params: this.buildParameters(options)
    });
  }

  /**
   * Create a new bid.
   *
   * @param auctionKey
   * @param data
   * @param options
   */
  create(auctionKey: string, data: AuctionBidCreateRequest, options = new ApiOperationOptions()): Observable<Bid> {
    const uri = this.buildApiEndpointUri(['api', 'Auctions', auctionKey, 'Bids']);
    return this._http.post<Bid>(uri, data, {
      params: this.buildParameters(options)
    });
  }
}
