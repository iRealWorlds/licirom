import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, startWith, switchMap } from 'rxjs';
import { Layout } from 'src/app/layout/layout.enum';
import { EnvironmentConfig } from 'src/app/core/environment/environment-config.model';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _layout: BehaviorSubject<Layout>;

  /**
   * LayoutService constructor method.
   *
   * @param _environment
   * @param _router
   * @param _activatedRoute
   */
  constructor(private _environment: EnvironmentConfig,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this._layout = new BehaviorSubject(localStorage.getItem('layout') as Layout ?? _environment.defaultLayout);
  }

  /**
   * Get the current layout, as an observable.
   */
  get layout$(): Observable<Layout> {
    return this._layout.asObservable().pipe(
      switchMap(setLayout => this.routeData$.pipe(
        map((data: Data) => {
          let preferredLayout = this._environment.defaultLayout;
          const dataLayout = data['layout'];  // eslint-disable-line

          if (dataLayout) {
            preferredLayout = dataLayout;
          } else if (setLayout) {
            preferredLayout = setLayout;
          }

          // If the preferred layout actually exists, that is the one that should be used
          if (Object.values(Layout).includes(preferredLayout)) {
            return preferredLayout;
          }
          return this._environment.defaultLayout;
        })
      ))
    );
  }

  /**
   * Set a new preferred layout.
   *
   * @param value
   */
  set layout(value: Layout) {
    localStorage.setItem('layout', value);
    this._layout.next(value);
  }

  /**
   * Get the current route data.
   */
  get routeData$(): Observable<Data> {
    return this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null),
      switchMap(() => {
        let route = this._activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.data;
      })
    );
  }
}
