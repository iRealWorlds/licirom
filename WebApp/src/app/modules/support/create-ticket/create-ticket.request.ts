export class CreateTicketRequest {
  title?: string;
  content?: string;

  /**
   * CreateTicketRequest constructor method.
   * @param initial
   */
  constructor(initial?: Partial<CreateTicketRequest>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
