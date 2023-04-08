import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-field-validation-errors',
  standalone: true,
  imports: [CommonModule, MatInputModule],
  templateUrl: './field-validation-errors.component.html'
})
export class FieldValidationErrorsComponent {
  @Input() error = '';
}
