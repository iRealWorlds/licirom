import { Route } from '@angular/router';
import { Layout } from '@licirom/layout/layout.enum';
import { SignOutComponent } from '@licirom/modules/auth/sign-out/sign-out.component';

export const signOutRouting: Route[] = [
  {
    path: '',
    component: SignOutComponent,
    data: {
      layout: Layout.Blank
    }
  }
];
