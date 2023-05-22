export class AuctionCreateRequest {
  title?: string;
  description?: string|null;
  categoryKey?: string|null;

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
