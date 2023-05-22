import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AuctionService } from '@licirom/modules/auctions/auction.service';
import { IdentityService } from '@licirom/core/identity/identity.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionCreatorGuard implements CanActivate {

  /**
   * AuctionCreatorGuard constructor method.
   *
   * @param _auctionService
   * @param _identityService
   * @param _router
   */
  constructor(
    private readonly _auctionService: AuctionService,
    private readonly _identityService: IdentityService,
    private readonly _router: Router
  ) {
  }

  /**
   * Check if the user can activate the route.
   *
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {// eslint-disable-line @typescript-eslint/no-unused-vars
    const auctionKey = route.paramMap.get('auctionKey');

    if (!auctionKey) {
      throw new Error('Invalid auction key');
    }

    return this._auctionService. getByKey(auctionKey).pipe(
      switchMap(auction => this._identityService.currentIdentity$.pipe(
        map(identity => auction.creatorKey === identity?.key)
      )),

      tap(async passes => {
        if (!passes) {
          await this._router.navigate(['/auctions']);
        }
      })
    );
  }

}
