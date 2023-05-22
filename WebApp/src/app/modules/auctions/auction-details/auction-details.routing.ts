import { Route } from '@angular/router';
import { AuctionDetailsComponent } from '@licirom/modules/auctions/auction-details/auction-details.component';
import { AuctionDetailsResolver } from '@licirom/modules/auctions/auction-details/auction-details.resolver';

export const auctionDetailsRouting: Route[] = [
  {
    path: ':auctionKey',
    component: AuctionDetailsComponent,
    resolve: {
      auction: AuctionDetailsResolver
    }
  }
];
