import { EventEmitter, Injectable } from '@angular/core';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { HttpClient } from '@angular/common/http';
import { AuthSessionCreateRequest } from '@licirom/core/auth/auth-session-create.request';
import { Observable, tap } from 'rxjs';
import { AuthSession } from '@licirom/core/auth/auth-session.model';
import { ApiService } from '@licirom/core/api/api.service';
import { TAuthToken } from '@licirom/core/auth/auth-token.type';

@Injectable()
export class AuthService extends ApiService {
  /**
   * The name the auth token has in the local storage.
   */
  static TOKEN_STORAGE_NAME = 'auth_token';

  /**
   * Event that is triggered when the current auth token is changed.
   */
  tokenChanged = new EventEmitter<TAuthToken>();

  /**
   * AuthService constructor method.
   *
   * @param _http
   * @param environment
   */
  constructor(
    private readonly _http: HttpClient,
    protected override readonly environment: EnvironmentConfig,
  ) {
    super(environment);
  }

  /**
   * Get the currently active token.
   */
  get currentToken(): TAuthToken {
    return localStorage.getItem(AuthService.TOKEN_STORAGE_NAME);
  }

  /**
   * Set a new token as the currently active one.
   *
   * @param token
   */
  set currentToken(token: TAuthToken) {
    // Update the value in the local storage
    if (token === null) {
      localStorage.removeItem(AuthService.TOKEN_STORAGE_NAME);
    } else {
      localStorage.setItem(AuthService.TOKEN_STORAGE_NAME, token.toString());
    }

    // Emit the token changed event
    this.tokenChanged.emit(token);
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
        }),
      );
    }

    // Return the request pipeline
    return request;
  }

  /**
   * Clear the current session data.
   */
  clearSession(): Observable<void> {
    this.currentToken = null;
    return new Observable<void>(subscriber => {
      subscriber.next();
      subscriber.complete();
    });
  }

}
