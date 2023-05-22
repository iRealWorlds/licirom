import { Injectable } from '@angular/core';
import { ApiService } from '@licirom/core/api/api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';
import { AuctionCreateRequest } from '@licirom/modules/auctions/auction-create.request';
import { AuctionUpdateRequest } from '@licirom/modules/auctions/auction-update.request';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { Auction } from '@licirom/modules/auctions/auction.model';

@Injectable({
  providedIn: 'root'
})
export class PendingAuctionsService extends ApiService {

  constructor(
    private readonly _http: HttpClient,
    protected override readonly environment: EnvironmentConfig
  ) {
    super(environment);
  }

  getAll(): Observable<PaginatedResult<Auction>> {
    const uri = this.buildApiEndpointUri('api/Auctions/pending');
    return this._http.get<PaginatedResult<Auction>>(uri);
  }

  Activate(auctionKey: string): Observable<boolean> {
    const uri = this.buildApiEndpointUri(`api/Auctions/${auctionKey}/activate`);
    return this._http.put<boolean>(uri, auctionKey);
  }


}
