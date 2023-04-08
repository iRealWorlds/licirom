import { NgModule } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  providers: [
    AuthService
  ],
  imports: [
    HttpClientModule
  ]
})
export class AuthModule { }
