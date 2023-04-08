import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityService } from 'src/app/core/identity/identity.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    IdentityService,
  ]
})
export class IdentityModule { }
