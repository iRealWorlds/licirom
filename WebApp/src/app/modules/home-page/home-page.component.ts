import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/core/identity/identity.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IdentityUser } from 'src/app/core/identity/identity-user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit, OnDestroy {
  identity$?: Observable<IdentityUser | null | undefined>;

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * HomePageComponent constructor method.
   *
   * @param _identityService
   */
  constructor(
    private readonly _identityService: IdentityService
  ) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    this.identity$ = this._identityService.currentIdentity$.pipe(
      takeUntil(this._unsubscribeAll)
    );
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
