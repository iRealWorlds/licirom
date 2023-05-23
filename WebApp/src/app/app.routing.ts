import { Route } from '@angular/router';
import { AuthGuard } from '@licirom/core/auth/auth.guard';
import { GuestGuard } from '@licirom/core/auth/guest.guard';

export const appRouting: Route[] = [
  // Redirect '/' to '/home'
  { path: '', redirectTo: '/auctions/list', pathMatch: 'full' },

  // Routes that require the user to be a guest
  {
    path: '',
    canActivate: [GuestGuard],
    children: [
      { path: 'auth/sign-in', loadChildren: () => import('src/app/modules/auth/sign-in/sign-in.module').then(m => m.SignInModule) },
      { path: 'auth/sign-up', loadChildren: () => import('src/app/modules/auth/sign-up/sign-up.module').then(m => m.SignUpModule) },
    ],
  },

  // Routes that require the user to be authenticated
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'auth/sign-out', loadChildren: () => import('src/app/modules/auth/sign-out/sign-out.module').then(m => m.SignOutModule) },
      { path: 'support', loadChildren: () => import('src/app/modules/support/support.module').then(m => m.SupportModule) },
      { path: 'auctions', loadChildren: () => import('src/app/modules/auctions/auctions.module').then(m => m.AuctionsModule) },
      { path: 'profile', loadChildren: () => import('src/app/modules/profile/profile.module').then(m => m.ProfileModule)},
      { path: 'admin', loadChildren: () => import('src/app/modules/admin/admin.module').then(m => m.AdminModule) },
    ],
  },

  // Routes that do not care about authentication
  {
    path: '',
    children: [
    ],

  },

  // Catch all route
  // { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
