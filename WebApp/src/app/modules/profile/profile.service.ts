import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@licirom/core/api/api.service';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { IdentityUser } from '@licirom/core/identity/identity-user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ApiService{

  /**
   * ProfileService constructor method
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
    * Get a single user from the API
    * @param profileKey 
    * @returns 
    */
   getByKey(profileKey: string): Observable<IdentityUser>{
    const uri = this.buildApiEndpointUri(['api','Users',profileKey]);
    return this._http.get<IdentityUser>(uri);
   }
}
