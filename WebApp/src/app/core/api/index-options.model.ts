import { ApiOperationOptions } from '@licirom/core/api/api-operation-options.model';

export class IndexOptions<TFilterSet> extends ApiOperationOptions {
  filters?: TFilterSet;

  /**
   * IndexOptions constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<IndexOptions<TFilterSet>>) {
    super(initial);
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
