import {Route} from '@angular/router';

export const appRouting: Route[] = [
   // Redirect '/' to '/home'
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Routes that require the user to be a guest
  {
    path: '',
    children: [],
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
