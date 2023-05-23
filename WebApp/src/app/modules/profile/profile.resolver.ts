import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProfileService } from '@licirom/modules/profile/profile.service';
import { IdentityUser } from '@licirom/core/identity/identity-user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<IdentityUser> {
  
  /**
   * Constructor of ProfileResolver
   * @param _profileService 
   */
  constructor(
      private readonly _profileService: ProfileService
  ){}

  /** @inheritdoc */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IdentityUser> {
    const profileKey = route.paramMap.get('profileKey');

    if(!profileKey){
      throw new Error('Invalid profile key');
    }

    return this._profileService.getByKey(profileKey);
  }
}
