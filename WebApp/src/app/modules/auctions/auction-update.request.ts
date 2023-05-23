export class AuctionUpdateRequest {
  title?: string;
  description?: string;
  startPrice?: number;
  reservePrice?: number;
  minimumIncrement?: number;
  startTime?: string;
  endTime?: string;

  /**
   * AuctionUpdateRequest constructor mehtod.
   *
   * @param initial
   */
  constructor(initial?: Partial<AuctionUpdateRequest>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
