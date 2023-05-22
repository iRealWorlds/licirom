import { Component, OnInit } from '@angular/core';
import { AuthService } from '@licirom/core/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatWith, filter, take } from 'rxjs';
import { IdentityService } from '@licirom/core/identity/identity.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html'
})
export class SignOutComponent implements OnInit {
  /**
   * SignOutComponent constructor method.
   *
   * @param _authService
   * @param _identityService
   * @param _router
   * @param _toastService
   */
  constructor(
    private readonly _authService: AuthService,
    private readonly _identityService: IdentityService,
    private readonly _router: Router,
    private readonly _toastService: MatSnackBar
  ) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    this._authService.clearSession().pipe(
      concatWith(
        this._identityService.currentIdentity$.pipe(
          filter(identity => !identity),
          take(1),
        ),
      )
    ).subscribe({
      next: console.debug,
      complete: async () => {
        await this._router.navigate(['/']).then(() => {
          this._toastService.open('Signed out successfully!', 'Close');
        });
      }
    });
  }
}
