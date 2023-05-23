import { Route } from '@angular/router';
import { AuctionsListComponent } from '@licirom/modules/auctions/auctions-list/auctions-list.component';
import { AuctionsListResolver } from '@licirom/modules/auctions/auctions-list/auctions-list.resolver';

export const auctionsListRouting: Route[] = [
  {
    path: '',
    component: AuctionsListComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      auctions: AuctionsListResolver
    },
  }
];
