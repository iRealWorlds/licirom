import { Injectable } from '@angular/core';
import { ApiService } from '@licirom/core/api/api.service';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@licirom/core/auth/auth.service';
import { SignUpRequest } from '@licirom/modules/auth/sign-up/sign-up.request';
import { concatMap, map, Observable } from 'rxjs';
import { IdentityUser } from '@licirom/core/identity/identity-user.model';

@Injectable({
  providedIn: 'root'
})
export class SignUpService extends ApiService {
  /**
   * SignUpService constructor method.
   *
   * @param environment
   * @param _http
   * @param _authService
   */
  constructor(
    protected override readonly environment: EnvironmentConfig,
    private readonly _http: HttpClient,
    private readonly _authService: AuthService,
  ) {
    super(environment);
  }

  /**
   * Send a request to create a new user with the given {@link data} and then sign in.
   * @param data
   */
  createAccount(data: SignUpRequest): Observable<IdentityUser> {
    return this._http.post<IdentityUser>(this.buildApiEndpointUri(this.environment.api.endpoints.users), data).pipe(
      // After signing up, send a request ot create a new auth session as well
      concatMap(response => this._authService.createSession(data).pipe(map(() => response)))
    );
  }
}
