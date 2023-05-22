import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  debounceTime,
  fromEvent,
  map,
  merge,
  Observable,
  of, startWith,
  Subject,
  switchMap,
  takeUntil,
  tap
} from 'rxjs';

@Component({
  selector: 'app-searchable-model-input',
  templateUrl: './searchable-model-input.component.html',
  styleUrls: ['./searchable-model-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableModelInputComponent),
      multi: true
    }
  ]
})
export class SearchableModelInputComponent<TModel> implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() searchFn: (query: string) => Observable<TModel[]> = () => of([]);
  @Input() displayFn: (entity: TModel) => string = (entity: TModel) => JSON.stringify(entity);
  @Input() label = '';

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  value?: TModel;

  searchControl = new FormControl<string>('');
  suggestions: TModel[] = [];
  searchFocused$?: Observable<boolean>;

  disabled = false;

  private readonly _unsubscribeAll = new Subject<void>();

  onChange: (value: TModel) => void = () => {
    // Do nothing
  };

  onTouched: () => void = () => {
    // Do nothing
  };

  /** @inheritDoc */
  ngOnInit(): void {
    // Update search suggestions when query changes
    this.searchControl.valueChanges.pipe(
      // Unsubscribe on component destruction
      takeUntil(this._unsubscribeAll),

      // Start with an empty string
      startWith(''),

      // Debounce searches
      debounceTime(300),

      // Get suggestions
      switchMap(query => this.searchFn(query ?? '')),

      // If the query matches a suggestion, set it as being active
      tap(suggestions => {
        const suggestion = suggestions.find(s => this.searchControl.value === this.displayFn(s));
        if (suggestion) {
          this.useSuggestion(suggestion);
        }
      }),
    ).subscribe(suggestions => {
      this.suggestions = suggestions;
    });

    // Initialize the searchFocused$ observable
    this.searchFocused$ = merge(
      fromEvent(window, 'focusin', {
        capture: true
      }),
      fromEvent(window, 'focusout', {
        capture: true
      })
    ).pipe(
      // Unsubscribe on component destruction
      takeUntil(this._unsubscribeAll),

      debounceTime(200),

      map(() => document.activeElement === this.searchInput?.nativeElement),
    );
  }

  /** @inheritDoc */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /** @inheritDoc */
  writeValue(value: TModel): void {
    this.value = value;
    this.onChange(value);
  }

  /** @inheritDoc */
  registerOnChange(fn: (value: TModel) => void): void {
    this.onChange = fn;
  }

  /** @inheritDoc */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** @inheritDoc */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Use the given {@link suggestion}.
   *
   * @param suggestion
   */
  useSuggestion(suggestion: TModel): void {
    const displayName = this.displayFn(suggestion);
    if (!this.value || displayName !== this.displayFn(this.value)) {
      this.searchControl.setValue(displayName);
      this.writeValue(suggestion);
    }
  }
}
