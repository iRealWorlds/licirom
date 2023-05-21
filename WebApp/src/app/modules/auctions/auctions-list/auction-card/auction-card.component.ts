import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auction-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.scss']
})
export class AuctionCardComponent {
  @Input() auction?: Auction;
}
