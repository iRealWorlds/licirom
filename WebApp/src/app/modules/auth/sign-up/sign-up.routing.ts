import { Route } from '@angular/router';
import { SignUpComponent } from 'src/app/modules/auth/sign-up/sign-up.component';
import { Layout } from 'src/app/layout/layout.enum';

export const signUpRouting: Route[] = [
  {
    path: '',
    component: SignUpComponent,
    data: {
      layout: Layout.Blank
    }
  }
];
