import { NgModule } from '@angular/core';
import { AuthService } from '@licirom/core/auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '@licirom/core/auth/auth.interceptor';



@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AuthModule { }
