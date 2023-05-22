import { Route } from '@angular/router';

export const adminRouting: Route[] = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  {
      path: 'categories',
      loadChildren: () => import('src/app/modules/admin/auction-categories/auction-categories.module').then(m=>m.AuctionCategoriesModule)
  },
  {
    path: 'auctions',
    loadChildren: () => import('src/app/modules/admin/pending-auctions/pending-auctions.module').then(m => m.PendingAuctionsModule)
  }
];
