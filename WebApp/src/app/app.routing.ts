import {Route} from '@angular/router';

export const appRouting: Route[] = [
   // Redirect '/' to '/home'
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Routes that require the user to be a guest
  {
    path: '',
    children: [
      { path: 'auth/sign-in', loadChildren: () => import('src/app/modules/auth/sign-in/sign-in.module').then(m => m.SignInModule) },
      { path: 'auth/sign-out', loadChildren: () => import('src/app/modules/auth/sign-out/sign-out.module').then(m => m.SignOutModule) },
    ],
  },

  // Routes that require the user to be authenticated
  {
    path: '',
    children: [],
  },

  // Routes that do not care about authentication
  {
    path: '',
    children: [
      { path: 'home', loadChildren: () => import('src/app/modules/home-page/home-page.module').then(m => m.HomePageModule) },
    ],
  },

  // Catch all route
  // { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
