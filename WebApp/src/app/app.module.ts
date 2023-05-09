import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '@licirom/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {CoreModule} from '@licirom/core/core.module';
import {appRouting} from '@licirom/app.routing';
import { LayoutModule } from '@licirom/layout/layout.module';
import { identityLoadedGuard } from '@licirom/core/identity/identity-loaded.guard';

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
    }]),

    // Core module
    CoreModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
