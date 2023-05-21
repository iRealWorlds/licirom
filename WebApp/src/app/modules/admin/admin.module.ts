import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { adminRouting } from '@licirom/modules/admin/admin.routing';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRouting)
  ]
})
export class AdminModule { }
