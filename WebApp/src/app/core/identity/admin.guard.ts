import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { IdentityService } from '@licirom/core/identity/identity.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  /**
   * AuthGuard constructor method.
   *
   * @param _identityService
   * @param _router
   */
  constructor(
    private readonly _identityService: IdentityService,
    private readonly _router: Router
  ) {
  }

  /** @inheritDoc */
  canActivate(): Observable<boolean> {
    return this._isAdmin();
  }

  /** @inheritDoc */
  canActivateChild(): Observable<boolean> {
    return this._isAdmin();
  }

  /**
   * Check if the guard should pass.
   *
   * @private
   */
  private _isAdmin(): Observable<boolean> {
    return this._identityService.currentIdentity$.pipe(
      map(identity => !!identity?.isAdmin),
    );
  }
}
