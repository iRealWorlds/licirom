export class AuctionCategoryCreateRequest {
    name?: string;
    description?: string|null;
    parentKey?: string|null;
  
    /**
     * AuctionCategoryCreateRequest constructor mehtod.
     *
     * @param initial
     */
    constructor(initial?: Partial<AuctionCategoryCreateRequest>) {
      if (initial) {
        Object.assign(this, initial);
      }
    }
}