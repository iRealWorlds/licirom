export class ApiOperationOptions {
  expand: string[] = [];

  /**
   * ApiOperationOptions constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<ApiOperationOptions>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
