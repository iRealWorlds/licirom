import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html'
})
export class SignOutComponent implements OnInit {
  /**
   * SignOutComponent constructor method.
   *
   * @param _authService
   * @param _router
   * @param _toastService
   */
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _toastService: MatSnackBar
  ) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    this._authService.currentToken = null;
    this._router.navigate(['']).then(() => {
      this._toastService.open('Signed out successfully!', 'Close');
    });
  }
}
