import { AuctionStatus } from '@licirom/modules/auctions/auction-status.enum';

import { TExpandable } from '@licirom/core/api/expandable.type';
import { User } from '@licirom/modules/users/user.model';

export interface Auction {
  key: string;
  title: string;
  description: string|null;
  creatorKey: string|null;
  creator: TExpandable<User, string>;
  categoryKey: string|null;
  reservePrice: number;
  minimumIncrement: number;
  startPrice: number;
  startTime: string;
  endTime: string;
  currentStatus: AuctionStatus;
}
