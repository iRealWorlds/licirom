import { AuctionStatus } from '@licirom/modules/auctions/auction-status.enum';

export interface Auction {
  key: string;
  title: string;
  description: string | null;
  creatorKey: string | null;
  categoryKey: string | null;
  currentStatus: AuctionStatus;
}
