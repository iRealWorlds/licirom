import { Injectable } from '@angular/core';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { ApiOperationOptions } from '@licirom/core/api/api-operation-options.model';
import { Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';

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
  protected buildParameters(options: ApiOperationOptions): Params {
    let params = new HttpParams();

    // Add expansions
    for (const property of options.expand) {
      params = params.append('expand', property);
    }

    // Return the result
    return params;
  }
}
