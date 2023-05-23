import { Injectable } from '@angular/core';
import { ApiService } from '@licirom/core/api/api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { AuctionStatus } from '@licirom/modules/auctions/auction-status.enum';

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
    const uri = this.buildApiEndpointUri(`api/Auctions/${auctionKey}`);
    return this._http.patch<boolean>(uri, {
      status: AuctionStatus.ACTIVE
    });
  }

  /**
   * Close an auction.
   *
   * @param auctionKey
   * @constructor
   */
  Close(auctionKey: string): Observable<boolean> {
    const uri = this.buildApiEndpointUri(`api/Auctions/${auctionKey}`);
    return this._http.patch<boolean>(uri, {
      status: AuctionStatus.CLOSED
    });
  }

}
