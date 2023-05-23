import { Route } from '@angular/router';
import { ProfileUpdateComponent } from '@licirom/modules/profile/profile-update/profile-update.component';
import { ProfileResolver } from '@licirom/modules/profile/profile.resolver';


export const userUpdateRouting: Route[] = [
  {
    path: ':profileKey',
    component: ProfileUpdateComponent,
    resolve: {
      profile: ProfileResolver
   },
  }
];
