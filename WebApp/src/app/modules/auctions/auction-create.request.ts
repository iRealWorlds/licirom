export class AuctionCreateRequest {
  title?: string;
  description?: string|null;
  categoryKey?: string|null;
  startPrice?: number;
  reservePrice?: number;
  minimumIncrement?: number;
  startTime?: string;
  endTime?: string;

  /**
   * AuctionCategoryCreateRequest constructor mehtod.
   *
   * @param initial
   */
  constructor(initial?: Partial<AuctionCreateRequest>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
