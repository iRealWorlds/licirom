import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IdentityService } from 'src/app/core/identity/identity.service';
import { IdentityUser } from 'src/app/core/identity/identity-user.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, NgOptimizedImage, MatMenuModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './navbar-layout.component.html'
})
export class NavbarLayoutComponent implements OnInit, OnDestroy {
  currentUser$?: Observable<IdentityUser | null | undefined>;
  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * NavbarLayoutComponent constructor method.
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
    this.currentUser$ = this._identityService.currentIdentity$.pipe(
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
