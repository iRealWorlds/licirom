export class AuctionCategoryFilters {
  query?: string;

  /**
   * AuctionCategoryFilters constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<AuctionCategoryFilters>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
