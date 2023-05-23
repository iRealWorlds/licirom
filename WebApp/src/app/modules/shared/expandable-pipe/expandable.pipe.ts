import { Pipe, PipeTransform } from '@angular/core';
import { TExpandable } from '@licirom/core/api/expandable.type';

@Pipe({
  name: 'expandable'
})
export class ExpandablePipe<TExpanded> implements PipeTransform {

  /**
   * Expand the given value.
   *
   * @param value
   * @param displayFn
   */
  transform(value: TExpandable<TExpanded, string|number>, displayFn: (a: TExpanded) => string): string {
    if (typeof value === 'string' || typeof value === 'number') {
      return value?.toString();
    } else {
      return displayFn(value);
    }
  }

}
