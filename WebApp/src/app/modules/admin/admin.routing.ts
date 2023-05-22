import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { PendingAuctionsComponent } from './pending-auctions/pending-auctions.component';
import { PendingAuctionsResolver } from './pending-auctions.resolver';

export const adminRouting: Route[] = [
    {
        path: 'auctions',
        component: PendingAuctionsComponent,
        resolve: {
            PendingAuctions: PendingAuctionsResolver
        }

    }

];
