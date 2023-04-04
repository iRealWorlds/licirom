import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { NavbarLayoutComponent } from 'src/app/layout/navbar-layout/navbar-layout.component';
import { BlankLayoutComponent } from 'src/app/layout/blank-layout/blank-layout.component';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    NavbarLayoutComponent,
    BlankLayoutComponent
  ]
})
export class LayoutModule { }
