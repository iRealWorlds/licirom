import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdentityService } from '@licirom/core/identity/identity.service';
import { AuthService } from '@licirom/core/auth/auth.service';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * AppComponent constructor method.
   *
   * @param _authService
   * @param _identityService
   */
  constructor(
    private readonly _authService: AuthService,
    private readonly _identityService: IdentityService
  ) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    // When the auth token changes, the identity service should fetch the new identity
    this._authService.tokenChanged.asObservable().pipe(
      takeUntil(this._unsubscribeAll),
      switchMap(() => this._identityService.getIdentity()),
    ).subscribe();
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
