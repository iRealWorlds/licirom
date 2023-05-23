import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SearchableModelInputComponent
} from '@licirom/modules/shared/searchable-model-input/searchable-model-input.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchableModelInputComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchableModelInputComponent
  ]
})
export class SearchableModelInputModule { }
