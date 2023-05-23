import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { AuctionService } from '@licirom/modules/auctions/auction.service';
import { ApiOperationOptions } from '@licirom/core/api/api-operation-options.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionDetailsResolver implements Resolve<Auction> {
  /**
   * AuctionDetailsResolver constructor method.
   *
   * @param _auctionService
   */
  constructor(
    private readonly _auctionService: AuctionService
  ) {
  }

  /**
   * Resolve data from the API.
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Auction> {// eslint-disable-line @typescript-eslint/no-unused-vars
    const auctionKey = route.paramMap.get('auctionKey');

    if (!auctionKey) {
      throw new Error('Invalid auction key');
    }

    return this._auctionService.getByKey(auctionKey, new ApiOperationOptions({
      expand: ['Creator', 'Category']
    }));
  }
}
