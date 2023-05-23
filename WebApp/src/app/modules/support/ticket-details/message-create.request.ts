export class MessageCreateRequest {
    messageContent = '';
    /**
     * AuctionCategoryCreateRequest constructor mehtod.
     *
     * @param initial
     */
    constructor(initial?: Partial<MessageCreateRequest>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}
