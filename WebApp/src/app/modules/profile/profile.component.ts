import { Component, OnInit, OnDestroy} from '@angular/core';
import { IdentityUser } from '@licirom/core/identity/identity-user.model';
import { Observable, Subject , firstValueFrom, takeUntil} from 'rxjs';
import { IdentityService } from '@licirom/core/identity/identity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '@licirom/modules/profile/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{
  profile?: IdentityUser;
  personalProfile = false;

  private readonly _unsubscribeAll = new Subject<void>();
  
  /**
   * HomePageComponent constructor method.
   *
   * @param _identityService
   */
  constructor(
    private readonly _identityService: IdentityService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _profileService: ProfileService,
    private readonly _router: Router,
    private readonly _toastService: MatSnackBar,
  ) {
  }
  
  /**
   * @inheritdoc
   */
  ngOnInit(): void {
    // Load Profile data
    this._activatedRoute.data.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(async data =>{
      if('profile' in data){
        this.profile = data['profile'];

        // Determine personal page
        const identity = await firstValueFrom(this._identityService.currentIdentity$);
        this.personalProfile = identity?.key === this.profile?.key;
      }
    });
  }

   /**
   * @inheritdoc
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  

}
