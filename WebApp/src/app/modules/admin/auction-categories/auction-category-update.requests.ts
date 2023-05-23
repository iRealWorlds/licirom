export class AuctionCategoryUpdateRequest {
    name?: string;
    description?: string|null;
    parentKey?: string|null;
  
    /**
     * AuctionCategoryUpdateRequest constructor mehtod.
     *
     * @param initial
     */
    constructor(initial?: Partial<AuctionCategoryUpdateRequest>) {
      if (initial) {
        Object.assign(this, initial);
      }
    }
  }