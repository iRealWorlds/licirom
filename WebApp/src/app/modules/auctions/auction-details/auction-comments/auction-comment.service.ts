import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { ApiService } from '@licirom/core/api/api.service';
import { Observable } from 'rxjs';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { AuctionComment } from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment.model';
import {
  AuctionCommentCreateRequest
} from '@licirom/modules/auctions/auction-details/auction-comments/auction-comment-create.request';

@Injectable({
  providedIn: 'root'
})
export class AuctionCommentService extends ApiService {
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
   * Get all comments from the API.
   */
  getAll(auctionKey: string): Observable<AuctionComment[]> {
    const uri = this.buildApiEndpointUri(['api', 'Auctions', auctionKey, 'Comments']);
    return this._http.get<AuctionComment[]>(uri);
  }

  /**
   * Create a new auction.
   *
   * @param auctionKey
   * @param data
   */
  create(auctionKey: string, data: AuctionCommentCreateRequest): Observable<Auction> {
    const uri = this.buildApiEndpointUri(['api', 'Auctions', auctionKey, 'Comments']);
    return this._http.post<Auction>(uri, data);
  }
}
