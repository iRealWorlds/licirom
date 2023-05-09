export class CreateTicketRequest {
    title?: string;
    content?: string;

    constructor(initial?: Partial<CreateTicketRequest>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}