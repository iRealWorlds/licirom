import { Route } from '@angular/router';
import { AdminGuard } from '@licirom/core/identity/admin.guard';

export const adminRouting: Route[] = [
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      {
        path: 'categories',
        loadChildren: () => import('src/app/modules/admin/auction-categories/auction-categories.module').then(m=>m.AuctionCategoriesModule)
      },
      {
        path: 'auctions',
        loadChildren: () => import('src/app/modules/admin/pending-auctions/pending-auctions.module').then(m => m.PendingAuctionsModule)
      }
    ]
  }
];
