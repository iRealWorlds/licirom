
import { Route } from '@angular/router';

export const adminRouting: Route[] = [
  {
    path: 'auctions',
    loadChildren: () => import('src/app/modules/admin/pending-auctions/pending-auctions.module').then(m => m.PendingAuctionsModule)
  }
];
