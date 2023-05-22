import { Route } from '@angular/router';
import { CategoriesDetailsComponent } from '@licirom/modules/admin/auction-categories/categories-details/categories-details.component';
import { CategoriesDetailsResolver } from '@licirom/modules/admin/auction-categories/categories-details/categories-details.resolver';

export const categoryDetailsRouting: Route[] = [
  {
    path: ':categoryKey',
    component: CategoriesDetailsComponent,
    resolve: {
      category: CategoriesDetailsResolver
    }
  }
];
