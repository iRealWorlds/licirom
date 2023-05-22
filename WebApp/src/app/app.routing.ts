import { Route } from '@angular/router';

export const appRouting: Route[] = [
  // Redirect '/' to '/home'
  { path: '', redirectTo: '/auctions/list', pathMatch: 'full' },

  // Routes that require the user to be a guest
  {
    path: '',
    children: [
      { path: 'auth/sign-in', loadChildren: () => import('src/app/modules/auth/sign-in/sign-in.module').then(m => m.SignInModule) },
      { path: 'auth/sign-up', loadChildren: () => import('src/app/modules/auth/sign-up/sign-up.module').then(m => m.SignUpModule) },
      { path: 'auth/sign-out', loadChildren: () => import('src/app/modules/auth/sign-out/sign-out.module').then(m => m.SignOutModule) },
    ],
  },

  // Routes that require the user to be authenticated
  {
    path: '',
    children: [
      { path: 'support', loadChildren: () => import('src/app/modules/support/support.module').then(m => m.SupportModule) },
      { path: 'auctions', loadChildren: () => import('src/app/modules/auctions/auctions.module').then(m => m.AuctionsModule) },
      { path: 'profile', loadChildren: () => import('src/app/modules/profile/profile.module').then(m => m.ProfileModule)},
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
