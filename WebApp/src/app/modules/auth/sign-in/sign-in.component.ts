import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AuthSessionCreateRequest } from 'src/app/core/auth/auth-session-create.request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormService } from 'src/app/core/forms/form.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  signInForm = new FormGroup({
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true}),
    password: new FormControl<string>('', { validators: [Validators.required], nonNullable: true})
  });

  private _loading = false;

  /**
   * SignInComponent constructor method.
   *
   * @param _authService
   * @param _toastService
   * @param _formService
   * @param _router
   */
  constructor(
    private readonly _authService: AuthService,
    private readonly _toastService: MatSnackBar,
    private readonly _formService: FormService,
    private readonly _router: Router,
  ) {
  }

  /**
   * Get the current loading state for this component.
   */
  get loading(): boolean {
    return this._loading;
  }

  /**
   * Set a new loading state for this component.
   *
   * @param value
   */
  set loading(value: boolean) {
    this._loading = value;

    if (value) {
      this.signInForm.disable();
    } else {
      this.signInForm.enable();
    }
  }


  /**
   * Submit the sign in request.
   */
  signIn(): void {
    // If already loading, throw an exception
    if (this.loading) {
      throw new Error('A sign in request is already pending.');
    }

    // Mark the form as having been touched so that validation errors are displayed
    this.signInForm.markAllAsTouched();

    // If the form is valid, build and send a request
    if (this.signInForm.valid) {
      // Build the request
      const data = new AuthSessionCreateRequest({
        emailAddress: this.signInForm.controls.email.value,
        password: this.signInForm.controls.password.value,
      });

      // Send the request
      this.loading = true;
      this._authService.createSession(data).subscribe({
        next: async () => {
          this._toastService.open('You have signed in successfully.', 'Close');
          await this._router.navigate(['']);
          this.loading = false;
        },
        error: (response: HttpErrorResponse) => {
          this.loading = false;

          if (response.status === 400) {
            this._formService.assignValidationErrorsFromResponse(response, this.signInForm);
          }

          this._toastService.open('An error has occurred. Please try again!', 'Close');
        }
      });
    }
  }
}
