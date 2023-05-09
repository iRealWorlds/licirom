import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@licirom/layout/layout.component';
import { NavbarLayoutComponent } from '@licirom/layout/navbar-layout/navbar-layout.component';
import { BlankLayoutComponent } from '@licirom/layout/blank-layout/blank-layout.component';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    NavbarLayoutComponent,
    BlankLayoutComponent
  ]
})
export class LayoutModule { }
