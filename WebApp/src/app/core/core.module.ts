import {NgModule, Optional, SkipSelf} from '@angular/core';
import {environment} from 'src/environments/environment';
import {EnvironmentConfig} from '@licirom/core/environment/environment-config.model';
import { AuthModule } from '@licirom/core/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { IdentityModule } from '@licirom/core/identity/identity.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';


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
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500
      }
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
