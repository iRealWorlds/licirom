export class AuctionBidCreateRequest {
  amount?: number;

  /**
   * CreateTicketRequest constructor method.
   * @param initial
   */
  constructor(initial?: Partial<AuctionBidCreateRequest>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }

}
