export class AuctionCategoryUpdateRequest {
  name?: string;
  description?: string|null;
  parentKey?: string|null;

  /**
   * AuctionCategoryCreateRequest constructor mehtod.
   *
   * @param initial
   */
  constructor(initial?: Partial<AuctionCategoryUpdateRequest>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
