import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from '@licirom/modules/profile/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileUpdateRequest } from '@licirom/modules/profile/profile-update.request';
import { IdentityUser } from '@licirom/core/identity/identity-user.model';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
    user?: IdentityUser;
  
    userForm = new FormGroup({
      firstName: new FormControl('', { nonNullable: true }),
      lastName: new FormControl('', { nonNullable: true })
    });
  
    private _loading = false;

    private readonly _unsubscribeAll = new Subject<void>();
  
    /**
     * ProfileUpdateComponent constructor method.
     *
     * @param _activatedRoute
     * @param _profileService
     * @param _router
     * @param _toastService
     */
    constructor(
      private readonly _activatedRoute: ActivatedRoute,
      private readonly _profileService: ProfileService,
      private readonly _router: Router,
      private readonly _toastService: MatSnackBar
    ) {}
  
    /**
     * Get the current loading state.
     */
    get loading(): boolean {
      return this._loading;
    }
  
    /**
     * Set a new loading state.
     *
     * @param value
     */
    set loading(value: boolean) {
      this._loading = value;
  
      if (value) {
        this.userForm.disable();
      } else {
        this.userForm.enable();
      }
    }
  
    /** @inheritDoc */
    ngOnInit(): void {
  
      this._activatedRoute.data.pipe(
        takeUntil(this._unsubscribeAll)
      ).subscribe (async data => {
        if('profile' in data) {
          this.user= data['profile'];
  
          if (this.user) {
            this.userForm.setValue({
              firstName: this.user.firstName ?? '',
              lastName: this.user.lastName ?? ''
            });
          }
        }
      });
  
    }
  
  
    /** @inheritDoc **/
    ngOnDestroy(): void {
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }
  
    /**
     * Update the profile.
     */
    updateUser(): void {
      // Make sure an profile exists
      if (!this.user) {
        throw new Error('No profile provided.');
      }
  
      // If already loading, throw an error
      if (this.loading) {
        throw new Error('Already creating a profile.');
      }
  
      // Mark the form as touched to display validation errors
      this.userForm.markAllAsTouched();
  
  
      if (this.userForm.valid) {
        // Build the request data
        const data = new ProfileUpdateRequest({
          firstName: this.userForm.controls.firstName.value,
          lastName: this.userForm.controls.lastName.value,
        });
  
        // Send the request
        this.loading = true;
        this._profileService.updateByKey(this.user.key, data).subscribe({
          next: async user => {
            await this._router.navigate(['/profile', user.key]);
            this._toastService.open('Profile updated successfully.', 'Close');
            this.loading = false;
          },
          error: () => {
            this.loading = false;
            this._toastService.open('Profile could not be updated.', 'Close');
          }
        });
      }
    }
  }