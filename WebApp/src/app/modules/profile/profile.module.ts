import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '@licirom/modules/profile/profile.component';
import { RouterModule } from '@angular/router';
import { profileRouting } from '@licirom/modules/profile/profile.routing';
import { ProfileUpdateComponent } from '@licirom/modules/profile/profile-update/profile-update.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(profileRouting),
  ]
})
export class ProfileModule { }
