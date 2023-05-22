import { Route } from '@angular/router';
import { CategoriesCreateComponent } from '@licirom/modules/admin/auction-categories/categories-create/categories-create.component';

export const categoriesCreateRouting: Route[] = [
    {
        path: '',
        component: CategoriesCreateComponent,
    }
];