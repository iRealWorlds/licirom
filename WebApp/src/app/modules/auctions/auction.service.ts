import { Injectable } from '@angular/core';
import { ApiService } from '@licirom/core/api/api.service';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { Observable } from 'rxjs';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';
import { AuctionCreateRequest } from '@licirom/modules/auctions/auction-create.request';

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
  getAll(): Observable<PaginatedResult<Auction>> {
    const uri = this.buildApiEndpointUri('api/Auctions');
    return this._http.get<PaginatedResult<Auction>>(uri);
  }

  /**
   * Create a new auction.
   *
   * @param data
   */
  create(data: AuctionCreateRequest): Observable<Auction> {
    const uri = this.buildApiEndpointUri('api/Auctions');
    return this._http.post<Auction>(uri, data);
  }
}
