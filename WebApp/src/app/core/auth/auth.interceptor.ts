import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { AuthService } from '@licirom/core/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * AuthInterceptor constructor method.
   *
   * @param _environment
   * @param _authService
   */
  constructor(
    private readonly _environment: EnvironmentConfig,
    private readonly _authService: AuthService,
  ) {}

  /**
   * @inheritDoc
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // If the request is made to a first party url and a current token is present, add it to the headers
    if (request.url.startsWith(this._environment.api.baseUri)) {
      const token = this._authService.currentToken;

      if (token) {
        request = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        });
      }
    }

    return next.handle(request);
  }
}
