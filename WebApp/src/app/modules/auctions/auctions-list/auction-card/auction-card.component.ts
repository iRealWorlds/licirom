import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auction } from '@licirom/modules/auctions/auction.model';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ExpandablePipeModule } from '@licirom/modules/shared/expandable-pipe/expandable-pipe.module';
import { User } from '@licirom/modules/users/user.model';
import { AuctionStatus } from '@licirom/modules/auctions/auction-status.enum';
import { TimeCardsComponent } from '@licirom/modules/shared/time-cards/time-cards.component';
import { interval, Subscription, takeWhile } from 'rxjs';
import { utcToDate } from '@licirom/core/utils/utc-to-date.util';

@Component({
  selector: 'app-auction-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink, ExpandablePipeModule, TimeCardsComponent],
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuctionCardComponent implements OnChanges {
  @Input() auction?: Auction;

  statuses = AuctionStatus;

  private _timeUpdateSubscription?: Subscription;

  /**
   * Get the time left until this auction starts.
   */
  get timeUntilStart(): number {
    if (!this.auction) {
      return 0;
    }

    const now = new Date();
    const startDate = utcToDate(this.auction.startTime);

    if (now < startDate) {
      return Math.floor(Math.abs(startDate.getTime() - now.getTime()) / 1000);
    } else {
      return 0;
    }
  }

  /**
   * Get the time left until this auction ends.
   */
  get timeUntilEnd(): number {
    if (!this.auction) {
      return 0;
    }

    const now = new Date();
    const endDate = utcToDate(this.auction.endTime);

    if (now < endDate) {
      return Math.floor(Math.abs(endDate.getTime() - now.getTime()) / 1000);
    } else {
      return 0;
    }
  }

  /**
   * AuctionCardComponent constructor method.
   *
   * @param _changeDetector
   */
  constructor(
    private readonly _changeDetector: ChangeDetectorRef
  ) {
  }

  /** @inheritDoc */
  ngOnChanges(changes: SimpleChanges): void {
    if ('auction' in changes) {
      if (this.auction) {
        this._timeUpdateSubscription?.unsubscribe();

        this._timeUpdateSubscription = interval(1000).pipe(
          takeWhile(() => this.timeUntilStart > 0 || this.timeUntilEnd > 0)
        ).subscribe(() => {
          this._changeDetector.detectChanges();
        });
      }
    }
  }

  /**
   * Display the creator's full name.
   *
   * @param user
   */
  displayCreatorName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

}
