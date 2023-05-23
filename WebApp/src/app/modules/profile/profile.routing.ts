import { Route } from '@angular/router';
import { ProfileComponent } from '@licirom/modules/profile/profile.component';
import { ProfileResolver } from '@licirom/modules/profile/profile.resolver';

export const profileRouting: Route[] =[
  {
    path:':profileKey',
    component: ProfileComponent,
    resolve: {
        profile: ProfileResolver
    }
  },
  {
    path: 'update',
    loadChildren: () => import('src/app/modules/profile/profile-update/profile-update.module').then(m => m.ProfileUpdateModule),
  }
];
