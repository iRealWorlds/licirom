export class ProfileUpdateRequest {
    firstName?: string;
    lastName?: string;
  
    /**
     * ProfileUpdateRequest constructor mehtod.
     *
     * @param initial
     */
    constructor(initial?: Partial<ProfileUpdateRequest>) {
      if (initial) {
        Object.assign(this, initial);
      }
    }
  }