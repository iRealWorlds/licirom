export class AuctionUpdateRequest {
  title?: string;
  description?: string;
  reservePrice?: number;
  minimumIncrement?: number;
  startPrice?: number;
  startTime?: string;
  endTime?: string;

  /**
   * AuctionCategoryCreateRequest constructor mehtod.
   *
   * @param initial
   */
  constructor(initial?: Partial<AuctionUpdateRequest>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
