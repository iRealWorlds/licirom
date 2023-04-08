import { Injectable } from '@angular/core';
import { EnvironmentConfig } from 'src/app/core/environment/environment-config.model';
import { HttpClient } from '@angular/common/http';
import { AuthSessionCreateRequest } from 'src/app/core/auth/auth-session-create.request';
import { Observable, tap } from 'rxjs';
import { AuthSession } from 'src/app/core/auth/auth-session.model';
import { ApiService } from 'src/app/core/api/api.service';

@Injectable()
export class AuthService extends ApiService {
  /**
   * The name the auth token has in the local storage.
   */
  static TOKEN_STORAGE_NAME = 'auth_token';

  /**
   * AuthService constructor method.
   *
   * @param _http
   * @param environment
   */
  constructor(
    private readonly _http: HttpClient,
    protected override readonly environment: EnvironmentConfig
  ) {
    super(environment);
  }

  /**
   * Get the currently active token.
   */
  get currentToken(): string|null {
    return localStorage.getItem(AuthService.TOKEN_STORAGE_NAME);
  }

  /**
   * Set a new token as the currently active one.
   *
   * @param token
   */
  set currentToken(token: string|null) {
    if (token === null) {
      localStorage.removeItem(AuthService.TOKEN_STORAGE_NAME);
    } else {
      localStorage.setItem(AuthService.TOKEN_STORAGE_NAME, token);
    }
  }

  /**
   * Create a new authentication session with the given {@link credentials}.
   *
   * @param credentials The credentials used for the session.
   * @param setActive Whether the new session should be the active one.
   */
  createSession(credentials: AuthSessionCreateRequest, setActive = true): Observable<AuthSession> {
    // Prepare a request
    let request = this._http.post<AuthSession>(this.buildApiEndpointUri([
      this.environment.api.endpoints.authSessions
    ]), credentials);

    // If the new session should be set as the active one, add this action to the pipeline
    if (setActive) {
      request = request.pipe(
        tap(session => {
          this.currentToken = session.token;
        })
      );
    }

    // Return the request pipeline
    return request;
  }


}
