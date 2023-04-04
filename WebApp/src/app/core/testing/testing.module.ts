import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from 'src/app/layout/layout.module';
import { environment } from 'src/environments/environment';
import { EnvironmentConfig } from 'src/app/core/environment/environment-config.model';


const sharedModules = new Set([
  // Angular modules
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  HttpClientTestingModule,
  RouterTestingModule,

  // Core modules
  LayoutModule,

  // Angular Material
  MatIconModule,
  MatSnackBarModule,
  MatButtonModule,
  MatSelectModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatPaginatorModule,
  MatChipsModule,
  MatCheckboxModule,
  MatSortModule,
  MatStepperModule,
  MatSidenavModule,
  MatTooltipModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatListModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatTabsModule,
]);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Shared modules
    ...Array.from(sharedModules)
  ],
  exports: [
    ...Array.from(sharedModules)
  ],
  providers: [
    {
      provide: EnvironmentConfig,
      useValue: environment
    },
    {
      provide: Window,
      useFactory: (): Window => window
    }
  ]
})
export class TestingModule { }
