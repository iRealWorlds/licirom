import { Injectable } from '@angular/core';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { ApiOperationOptions } from '@licirom/core/api/api-operation-options.model';
import { Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { IndexOptions } from '@licirom/core/api/index-options.model';

@Injectable()
export class ApiService {

  /**
   * ApiService constructor method.
   *
   * @param environment
   */
  constructor(protected readonly environment: EnvironmentConfig) { }

  /**
   * Build a URI for accessing a given API endpoint.
   *
   * @param segments
   */
  protected buildApiEndpointUri(segments: string[]|string): string {
    // Normalize the segments
    if (!Array.isArray(segments)) {
      segments = [segments];
    }

    // Trim slashes from the segments
    segments = segments.map(segment => segment.replace(/\/+$/, ''));

    // Add the base api uri
    segments.unshift(this.environment.api.baseUri);

    // Glue the segments together
    return segments.join('/');
  }

  /**
   * Build the parameters that reflect the given {@link options}.
   *
   * @param options
   * @protected
   */
  protected buildParameters(options: IndexOptions<unknown>|ApiOperationOptions): Params {
    let params = new HttpParams();

    // Add filters (if present)
    if ('filters' in options) {
      if (options.filters) {
        for (const [key, value] of Object.entries(options.filters)) {
          params = params.append(key, value);
        }
      }
    }

    // Add pagination (if present)
    if ('page' in options) {
      if (options.page) {
        params = params.append('page', options.page);
      }
    }
    if ('pageSize' in options) {
      if (options.pageSize) {
        params = params.append('pageSize', options.pageSize);
      }
    }

    // Add expansions
    for (const property of options.expand) {
      params = params.append('expand', property);
    }

    // Return the result
    return params;
  }
}
