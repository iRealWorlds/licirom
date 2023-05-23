import { Component, Input } from '@angular/core';
import { Bid } from '@licirom/modules/auctions/auction-details/auction-bids/bid.model';
import { User } from '@licirom/modules/users/user.model';

@Component({
  selector: 'app-auction-bid-entry',
  templateUrl: './auction-bid-entry.component.html',
  styleUrls: ['./auction-bid-entry.component.scss']
})
export class AuctionBidEntryComponent {
  @Input() position = 1;
  @Input() bid?: Bid;

  /**
   * Format the user to be displayed.
   *
   * @param user
   */
  displayUser(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }
}
