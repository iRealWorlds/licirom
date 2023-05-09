import { TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutService } from '@licirom/layout/layout.service';
import { EnvironmentConfig } from '@licirom/core/environment/environment-config.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Layout } from '@licirom/layout/layout.enum';
import { of } from 'rxjs';
import { environment as testEnvironment } from 'src/environments/environment';

describe('LayoutService', () => {
  let service: LayoutService;
  const environment = testEnvironment;

  let fakeStorageItems: { [p: string]: string } = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {
          provide: EnvironmentConfig,
          useValue: environment
        }
      ]
    });
    service = TestBed.inject(LayoutService);

    // Mock the localStorage
    spyOn(window.localStorage, 'getItem').and.callFake(key =>
      key in fakeStorageItems ? fakeStorageItems[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (fakeStorageItems[key] = value + '')
    );
    spyOn(window.localStorage, 'clear').and.callFake(() => (fakeStorageItems = {}));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the layout in the localStorage', function () {
    service.layout = Layout.Navbar;
    expect(localStorage.getItem('layout')).toBe(Layout.Navbar);

    service.layout = Layout.Blank;
    expect(localStorage.getItem('layout')).toBe(Layout.Blank);
  });

  describe('layout$', function () {
    it('should return the value set in the environment by default', waitForAsync(function () {
      service.layout$.subscribe(result => expect(result).toBe(environment.defaultLayout));
    }));

    it('should return the value overridden by the route', waitForAsync(function () {
      environment.defaultLayout = Layout.Navbar;
      const routeDataSpy = spyOnProperty(service, 'routeData$').and.returnValue(of({
        layout: Layout.Blank
      }));
      service.layout$.subscribe(result => expect(result).toBe(Layout.Blank));
      expect(routeDataSpy).toHaveBeenCalled();
    }));
  });
});
