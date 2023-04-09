import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  /**
   * Assign the validation errors from the {@link response} to the given {@link control}.
   *
   * @param response
   * @param control
   */
  assignValidationErrorsFromResponse(response: HttpErrorResponse, control: AbstractControl): void {
    if (typeof response.error === 'object') {
      // An inline method for transforming a string to camelCase
      const camelize = (subject: string): string => subject.replace(/^\w|[A-Z]|\b\w|\s+/g, (match, index) => {
          if (+match === 0) {
            return '';
          } // Or if (/\s+/.test(match)) for white spaces
          return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });

      // Loop through the errors and add them
      for (const [field, errors] of Object.entries(response.error)) {
        // Make sure the field and errors are formed correctly
        if (!Array.isArray(errors) || errors.some(e => typeof e !== 'string')) {
          continue;
        }

        // Get the field this error is for
        const appliedOn = field === '*' ? control : (control.get(field) ?? control.get(camelize(field)));
        console.debug(field, errors, appliedOn);

        // Make sure the field actually exists
        if (!appliedOn) {
          continue;
        }
        // If the control is not enabled, validation errors cannot be added
        const wasDisabled = control.disabled;
        control.enable();

        // Set the field errors
        appliedOn.setErrors(errors.reduce((current, value) => {
          Object.assign(current, {
            [value]: true
          });
          return current;
        }, {}));

        // Restore the disabled status
        if (wasDisabled) {
          control.disable();
        }
      }

      // Update the control's validity
      control.updateValueAndValidity();

      // Mark the control as having been touched
      control.markAllAsTouched();
    }

  }
}
