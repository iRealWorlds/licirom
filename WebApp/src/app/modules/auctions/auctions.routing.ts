import { Route } from '@angular/router';

export const auctionsRouting: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    loadChildren: () => import('src/app/modules/auctions/auctions-list/auctions-list.module').then(m => m.AuctionsListModule)
  }
];
