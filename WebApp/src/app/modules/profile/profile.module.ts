import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '@licirom/modules/profile/profile.component';
import { RouterModule } from '@angular/router';
import { profileRouting } from '@licirom/modules/profile/profile.routing';
import { ProfileUpdateComponent } from '@licirom/modules/profile/profile-update/profile-update.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(profileRouting),
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ProfileModule { }
