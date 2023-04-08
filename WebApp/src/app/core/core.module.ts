import {NgModule, Optional, SkipSelf} from '@angular/core';
import {environment} from 'src/environments/environment';
import {EnvironmentConfig} from 'src/app/core/environment/environment-config.model';
import { AuthModule } from 'src/app/core/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { IdentityModule } from 'src/app/core/identity/identity.module';


@NgModule({
  imports: [
    HttpClientModule,
    AuthModule,
    IdentityModule,
  ],
  providers: [
    {
      provide: EnvironmentConfig,
      useValue: environment,
    },
  ]
})
export class CoreModule {
  /**
   * Constructor
   */
  constructor(
    @Optional() @SkipSelf() parentModule?: CoreModule
  ) {
    // Do not allow multiple injections
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
    }
  }
}
