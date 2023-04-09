import { Route } from '@angular/router';
import { Layout } from 'src/app/layout/layout.enum';
import { SignOutComponent } from 'src/app/modules/auth/sign-out/sign-out.component';

export const signOutRouting: Route[] = [
  {
    path: '',
    component: SignOutComponent,
    data: {
      layout: Layout.Blank
    }
  }
];
