import { Route } from '@angular/router';
import { SignUpComponent } from '@licirom/modules/auth/sign-up/sign-up.component';
import { Layout } from '@licirom/layout/layout.enum';

export const signUpRouting: Route[] = [
  {
    path: '',
    component: SignUpComponent,
    data: {
      layout: Layout.Blank
    }
  }
];
