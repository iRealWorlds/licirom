export class MessageCreateRequest {
    messageContent: string = '';
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
