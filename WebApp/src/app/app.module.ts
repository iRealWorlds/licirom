import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {CoreModule} from 'src/app/core/core.module';
import {appRouting} from 'src/app/app.routing';
import { LayoutModule } from 'src/app/layout/layout.module';
import { identityLoadedGuard } from 'src/app/core/identity/identity-loaded.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([{
      path: '',
      canActivate: [identityLoadedGuard],
      children: appRouting
    },
      { path: 'support', loadChildren: () => import('./modules/support/support.module').then(m => m.SupportModule) }]),

    // Core module
    CoreModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
