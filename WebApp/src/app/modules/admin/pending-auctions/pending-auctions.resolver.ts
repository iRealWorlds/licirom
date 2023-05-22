import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';
import { PendingAuctionsService } from '@licirom/modules/admin/pending-auctions/pending-auctions.service';
import { Auction } from '@licirom/modules/auctions/auction.model';

@Injectable({
  providedIn: 'root'
})
export class PendingAuctionsResolver implements Resolve<PaginatedResult<Auction>> {


  /**
   * PendingAuctionsResolver constructor method.
   *
   * @param _pendingAuctionService
   * @param _http
   */
  constructor(
    private readonly _pendingAuctionService: PendingAuctionsService,
    private _http: HttpClient
  ) { }

  /**
   * Resolve the data from the API.
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<Auction>> { // eslint-disable-line @typescript-eslint/no-unused-vars

    return this._pendingAuctionService.getAll();
  }
}
