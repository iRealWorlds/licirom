import { SignInComponent } from '@licirom/modules/auth/sign-in/sign-in.component';
import { Route } from '@angular/router';
import { Layout } from '@licirom/layout/layout.enum';

export const signInRouting: Route[] = [
  {
    path: '',
    component: SignInComponent,
    data: {
      layout: Layout.Blank
    }
  }
];
