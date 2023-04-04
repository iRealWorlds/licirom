import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Layout } from 'src/app/layout/layout.enum';
import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {
  layout$?: Observable<Layout>;
  layouts = Layout;

  private _unsubscribeAll = new Subject<void>();

  /**
   * LayoutComponent constructor method.
   *
   * @param _layoutService
   */
  constructor(
    private readonly _layoutService: LayoutService
  ) {
  }

  /**
   * On component initialisation.
   */
  ngOnInit(): void {
    this.layout$ = this._layoutService.layout$.pipe(
      takeUntil(this._unsubscribeAll)
    );
  }

  /**
   * On component destruction.
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

