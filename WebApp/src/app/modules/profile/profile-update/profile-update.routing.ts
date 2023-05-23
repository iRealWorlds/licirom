import { Route } from '@angular/router';
import { ProfileUpdateComponent } from '@licirom/modules/profile/profile-update/profile-update.component';


export const userUpdateRouting: Route[] = [
  {
    path: ':userKey',
    component: ProfileUpdateComponent,
    resolve: {
      //profile: ProfileDetailsResolver
    },
  }
];
