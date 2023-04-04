import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from 'src/app/layout/layout.component';
import { Observable, ReplaySubject, take } from 'rxjs';
import { Layout } from 'src/app/layout/layout.enum';
import { LayoutService } from 'src/app/layout/layout.service';
import createSpyObj = jasmine.createSpyObj;
import { NavbarLayoutComponent } from 'src/app/layout/navbar-layout/navbar-layout.component';
import { BlankLayoutComponent } from 'src/app/layout/blank-layout/blank-layout.component';
import { EnvironmentConfig } from 'src/app/core/environment/environment-config.model';
import { TestingModule } from 'src/app/core/testing/testing.module';
import { environment } from 'src/environments/environment';

describe('LayoutsComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  const layoutSubject = new ReplaySubject<Layout>(1);
  const fakeLayoutService: Partial<LayoutService> = {
    get layout$(): Observable<Layout> {
      return layoutSubject.asObservable();
    }
  };

  const fakeWindow = createSpyObj<Window>([
    'dispatchEvent',
    'scroll'
  ], {
    get location(): Location {
      return {
        pathname: '/ro/test-path'
      } as never;
    }
  });
  fakeWindow.dispatchEvent.and.callFake((event: Event) => window.dispatchEvent(event));
  fakeWindow.scroll.and.callThrough();

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
      ],
      imports: [
        TestingModule,
        NavbarLayoutComponent,
        BlankLayoutComponent
      ],
      providers: [
        {
          provide: EnvironmentConfig,
          useValue: environment
        },
        {
          provide: LayoutService,
          useValue: fakeLayoutService
        }, {
          provide: Window,
          useValue: fakeWindow
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen to the layout$ observable', async () => {
    expect(component).toBeTruthy();

    layoutSubject.next(Layout.Blank);
    await fixture.whenStable();
    expect(await component.layout$?.pipe(take(1)).toPromise()).toBe(Layout.Blank);

    layoutSubject.next(Layout.Navbar);
    await fixture.whenStable();
    expect(await component.layout$?.pipe(take(1)).toPromise()).toBe(Layout.Navbar);
  });
});
