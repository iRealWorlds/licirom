import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { AuctionService } from '@licirom/modules/auctions/auction.service';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionsListResolver implements Resolve<PaginatedResult<Auction>> {
  /**
   * AuctionsListResolver constructor method.
   *
   * @param _auctionService
   */
  constructor(
    private readonly _auctionService: AuctionService
  ) {
  }

  /**
   * @inheritDoc
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<Auction>> { // eslint-disable-line @typescript-eslint/no-unused-vars
    return this._auctionService.getAll();
  }
}
