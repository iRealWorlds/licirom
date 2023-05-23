import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { auctionsCreateRouting } from '@licirom/modules/auctions/auctions-create/auctions-create.routing';
import { AuctionsCreateComponent } from '@licirom/modules/auctions/auctions-create/auctions-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  FieldValidationErrorsComponent
} from '@licirom/modules/shared/field-validation-errors/field-validation-errors.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import {
    SearchableModelInputModule
} from '@licirom/modules/shared/searchable-model-input/searchable-model-input.module';



@NgModule({
  declarations: [
    AuctionsCreateComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(auctionsCreateRouting),
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        FieldValidationErrorsComponent,
        MatIconModule,
        SearchableModelInputModule
    ]
})
export class AuctionsCreateModule { }
