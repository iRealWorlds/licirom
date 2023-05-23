import { AuctionStatus } from '@licirom/modules/auctions/auction-status.enum';
import { Params } from '@angular/router';

export class AuctionFilters {
  query?: string;
  createdByMe?: boolean;
  categoryKeys?: string[];
  statuses?: AuctionStatus[];

  /**
   * AuctionCategoryFilters constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<AuctionFilters>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }

  /**
   * Create a new HttpParams instance with the current filters.
   */
  toParams(): Params {
    const params: Params = {};

    if (this.query !== undefined) {
      params['query'] = this.query;
    }

    if (this.createdByMe !== undefined) {
      params['createdByMe'] = this.createdByMe;
    }

    if (this.categoryKeys !== undefined) {
      for (let i = 0; i < this.categoryKeys.length; i++){
        params[`categoryKeys[${i}]`] = this.categoryKeys[i];
      }
    }

    if (this.statuses !== undefined) {
      for (let i = 0; i < this.statuses.length; i++){
        params[`statuses[${i}]`] = this.statuses[i];
      }
    }

    return params;
  }

  /**
   * Build a new instance of this class, using the data from the {@link params}.
   * @param params
   */
  static fromParams(params: Params): AuctionFilters {
    const filters = new AuctionFilters();

    if ('query' in params) {
      filters.query = params['query'];
    }
    if ('createdByMe' in params) {
      filters.createdByMe = params['createdByMe'].toLowerCase() === 'true' || params['createdByMe'].toString().toLowerCase() === '1';
    }

    Object.keys(params).filter(key => /categoryKeys\[[0-9]+]/g.test(key)).forEach(key => {
      filters.categoryKeys = [
        ...(filters.categoryKeys ?? []),
        params[key]
      ];
    });

    Object.keys(params).filter(key => /statuses\[[0-9]+]/g.test(key)).forEach(key => {
      filters.statuses = [
        ...(filters.statuses ?? []),
        parseInt(params[key])
      ];
    });

    return filters;
  }
}
