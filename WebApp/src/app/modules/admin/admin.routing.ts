
import { Route } from '@angular/router';
import { PendingAuctionsComponent } from '@licirom/modules/admin/pending-auctions/pending-auctions.component';
import { PendingAuctionsResolver } from '@licirom/modules/admin/pending-auctions.resolver';

export const adminRouting: Route[] = [
    {
        path: 'auctions',
        component: PendingAuctionsComponent,
        resolve: {
            PendingAuctions: PendingAuctionsResolver
        }

    }

];
