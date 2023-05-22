import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '@licirom/modules/profile/profile.component';
import { RouterModule } from '@angular/router';
import { profileRouting } from '@licirom/modules/profile/profile.routing';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(profileRouting),
  ]
})
export class ProfileModule { }
