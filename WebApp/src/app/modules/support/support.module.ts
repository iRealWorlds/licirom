import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { supportRouting } from '@licirom/modules/support/support.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(supportRouting)
  ]

})
export class SupportModule { }
