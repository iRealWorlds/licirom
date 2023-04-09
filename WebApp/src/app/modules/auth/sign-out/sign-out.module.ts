import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignOutComponent } from 'src/app/modules/auth/sign-out/sign-out.component';
import { signOutRouting } from 'src/app/modules/auth/sign-out/sign-out.routing';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    SignOutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(signOutRouting),
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ]
})
export class SignOutModule { }
