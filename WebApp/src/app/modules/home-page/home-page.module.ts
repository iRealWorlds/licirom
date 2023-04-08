import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from 'src/app/modules/home-page/home-page.component';
import {RouterModule} from '@angular/router';
import {homePageRouting} from 'src/app/modules/home-page/home-page.routing';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    HomePageComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(homePageRouting),
        MatButtonModule
    ]
})
export class HomePageModule { }
