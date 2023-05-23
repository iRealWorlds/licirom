import { Route } from '@angular/router';
import { AuctionUpdateComponent } from '@licirom/modules/auctions/auction-update/auction-update.component';
import { AuctionDetailsResolver } from '@licirom/modules/auctions/auction-details/auction-details.resolver';
import { AuctionCreatorGuard } from '@licirom/modules/auctions/auction-creator.guard';

export const auctionUpdateRouting: Route[] = [
  {
    path: ':auctionKey',
    component: AuctionUpdateComponent,
    resolve: {
      auction: AuctionDetailsResolver
    },
    canActivate: [AuctionCreatorGuard]
  }
];
