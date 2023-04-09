import { SignInComponent } from 'src/app/modules/auth/sign-in/sign-in.component';
import { Route } from '@angular/router';
import { Layout } from 'src/app/layout/layout.enum';

export const signInRouting: Route[] = [
  {
    path: '',
    component: SignInComponent,
    data: {
      layout: Layout.Blank
    }
  }
];
