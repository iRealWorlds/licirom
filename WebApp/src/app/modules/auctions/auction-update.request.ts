export class AuctionUpdateRequest {
  title?: string;
  description?: string|null;

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
