export interface Auction {
  key: string;
  title: string;
  description: string | null;
  creatorKey: string | null;
  categoryKey: string | null;
  currentStatus: string | null;
}
