import { AuctionStatus } from '@licirom/modules/auctions/auction-status.enum';

import { TExpandable } from '@licirom/core/api/expandable.type';
import { User } from '@licirom/modules/users/user.model';
import { AuctionCategory } from '@licirom/modules/auctions/auction-category.model';

export interface Auction {
  key: string;
  title: string;
  description: string|null;
  creator: TExpandable<User, string>;
  category: TExpandable<AuctionCategory, string>;
  reservePrice: number;
  minimumIncrement: number;
  startPrice: number;
  startTime: string;
  endTime: string;
  currentStatus: AuctionStatus;
}
