import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandablePipe } from '@licirom/modules/shared/expandable-pipe/expandable.pipe';



@NgModule({
  declarations: [
    ExpandablePipe
  ],
  exports: [
    ExpandablePipe
  ],
  imports: [
    CommonModule
  ]
})
export class ExpandablePipeModule { }
