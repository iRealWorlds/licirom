import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { PendingAuctionsService } from './pending-auctions.service';
import { Auction } from '../auctions/auction.model';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '@licirom/core/pagination/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class PendingAuctionsResolver implements Resolve<PaginatedResult<Auction>> {


  constructor(

    private readonly _pendingAuctionService: PendingAuctionsService,
    private _http: HttpClient
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<Auction>> {

    return this._pendingAuctionService.getAll();
  }
}
