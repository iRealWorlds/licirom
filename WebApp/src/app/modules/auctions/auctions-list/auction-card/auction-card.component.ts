import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ExpandablePipeModule } from '@licirom/modules/shared/expandable-pipe/expandable-pipe.module';
import { User } from '@licirom/modules/users/user.model';
import { DatePipe } from '@angular/common';
import { AuctionStatus } from '@licirom/modules/auctions/auction-status.enum';
import { of } from 'rxjs';

@Component({
  selector: 'app-auction-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink, ExpandablePipeModule],
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.scss']
})
export class AuctionCardComponent {
  @Input() auction?: Auction;
  statuses = AuctionStatus;

  /**
   * Display the creator's full name.
   *
   * @param user
   */
  displayCreatorName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  isAvailable(startDateString: string, endDateString: string) {
    const date = new Date();
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (startDate < date && endDate > date) {
      return true;
    }

    return false;
  }
  isinFuture(startDateString: string) {
    const date = new Date();
    const startDate = new Date(startDateString);

    if (startDate > date) {
      return true;
    }

    return false;
  }

  wasBefore(endDateString: string) {

    const date = new Date();
    const endDate = new Date(endDateString);
    if (endDate < date) return true;
    return false;
  }

}
