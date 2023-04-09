import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormService } from 'src/app/core/forms/form.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SignUpRequest } from 'src/app/modules/auth/sign-up/sign-up.request';
import { SignUpService } from 'src/app/modules/auth/sign-up/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    emailAddress: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true}),
    password: new FormControl<string>('', { validators: [Validators.required], nonNullable: true})
  });

  private _loading = false;

  /**
   * SignInComponent constructor method.
   *
   * @param _signUpService
   * @param _toastService
   * @param _formService
   * @param _router
   */
  constructor(
    private readonly _signUpService: SignUpService,
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
      this.signUpForm.disable();
    } else {
      this.signUpForm.enable();
    }
  }

  /**
   * Send the sign-up request to the API.
   */
  signUp(): void {
    // If already loading, throw an exception
    if (this.loading) {
      throw new Error('An account is already being created.');
    }

    // Mark the form as having been touched so that validation errors are displayed
    this.signUpForm.markAllAsTouched();

    // If the form is valid, build and send a request
    if (this.signUpForm.valid) {
      // Build the request
      const data = new SignUpRequest({
        emailAddress: this.signUpForm.controls.emailAddress.value,
        password: this.signUpForm.controls.password.value,
      });

      // Send the request
      this.loading = true;
      this._signUpService.createAccount(data).subscribe({
        next: async () => {
          this._toastService.open('You have created an account successfully.', 'Close');
          await this._router.navigate(['']);
          this.loading = false;
        },
        error: (response: HttpErrorResponse) => {
          this.loading = false;

          if (response.status === 400) {
            this._formService.assignValidationErrorsFromResponse(response, this.signUpForm);
          }

          this._toastService.open('An error has occurred. Please try again!', 'Close');
        }
      });
    }
  }
}
