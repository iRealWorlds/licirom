import { Injectable } from '@angular/core';
import { EnvironmentConfig } from 'src/app/core/environment/environment-config.model';

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
  protected buildApiEndpointUri(segments: string[]): string {
    // Trim slashes from the segments
    segments = segments.map(segment => segment.replace(/\/+$/, ''));

    // Add the base api uri
    segments.unshift(this.environment.api.baseUri);

    // Glue the segments together
    return segments.join('/');
  }

}
