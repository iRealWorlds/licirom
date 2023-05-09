import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { IdentityUser } from '@licirom/core/identity/identity-user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '@licirom/core/api/api.service';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { AuthService } from '@licirom/core/auth/auth.service';
import jwtDecode from 'jwt-decode';

type TCurrentIdentity = IdentityUser|null;

@Injectable()
export class IdentityService extends ApiService {
  /**
   * A subject that hold the latest loaded identity user or undefined if none has been loaded.
   *
   * @private
   */
  private readonly _currentIdentity = new BehaviorSubject<TCurrentIdentity|undefined>(undefined);

  /**
   *
   * @param environment
   * @param _authService
   * @param _http
   */
  constructor(
    protected override readonly environment: EnvironmentConfig,
    private readonly _authService: AuthService,
    private readonly _http: HttpClient,
  ) {
    super(environment);
  }

  /**
   * Get the latest loaded identity user or undefined if none has been loaded.
   */
  get currentIdentity$(): Observable<TCurrentIdentity|undefined> {
    return this._currentIdentity.asObservable();
  }

  /**
   * Get the current identity data from the API.
   */
  getIdentity(): Observable<TCurrentIdentity> {
    // If there is no token, the current identity cannot be anything other than null
    if (!this._authService.currentToken) {
      this._currentIdentity.next(null);
      return of(null);
    }

    // If there is a token, send a request to get the identity data
    const { sub } = jwtDecode<{ sub: string }>(this._authService.currentToken);
    return this._http.get<TCurrentIdentity>(this.buildApiEndpointUri([this.environment.api.endpoints.users, sub])).pipe(
      // Catch 401 responses
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this._authService.clearSession();
            return of(null);
          }
        }
        return throwError(() => error);
      }),

      // Update the subject
      tap((identity: TCurrentIdentity) => {
        this._currentIdentity.next(identity);
      })
    );
  }
}
