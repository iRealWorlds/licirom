export class AuctionCommentCreateRequest {
  content?: string;

  /**
   * AuctionCommentCreateRequest constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<AuctionCommentCreateRequest>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
