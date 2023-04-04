import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import {RouterModule} from "@angular/router";
import {homePageRouting} from "./home-page.routing";



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homePageRouting)
  ]
})
export class HomePageModule { }
