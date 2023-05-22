import { Injectable } from '@angular/core';
import { ApiService } from '@licirom/core/api/api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { Auction } from '@licirom/modules/auctions/auction.model';

@Injectable({
  providedIn: 'root'
})
export class PendingAuctionsService extends ApiService {

  /**
   * PendingAuctionsService constructor method.
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
   * Get all auctions.
   */
  getAll(): Observable<PaginatedResult<Auction>> {
    const uri = this.buildApiEndpointUri('api/Auctions/pending');
    return this._http.get<PaginatedResult<Auction>>(uri);
  }

  /**
   * Activate an auction.
   *
   * @param auctionKey
   * @constructor
   */
  Activate(auctionKey: string): Observable<boolean> {
    const uri = this.buildApiEndpointUri(`api/Auctions/${auctionKey}/activate`);
    return this._http.put<boolean>(uri, auctionKey);
  }

  /**
   * Close an auction.
   *
   * @param auctionKey
   * @constructor
   */
  Close(auctionKey: string): Observable<boolean> {
    const uri = this.buildApiEndpointUri(`api/Auctions/${auctionKey}/close`);
    return this._http.put<boolean>(uri, auctionKey);
  }

}
