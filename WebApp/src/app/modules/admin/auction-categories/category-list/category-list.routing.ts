import { Route } from '@angular/router';
import { CategoryListComponent } from '@licirom/modules/admin/auction-categories/category-list/category-list.component';
import { CategoryListResolver } from '@licirom/modules/admin/auction-categories/category-list/category-list.resolver';

export const categoryListRouting: Route[] = [
    {
        path:'',
        component: CategoryListComponent,
        resolve: {
            categories: CategoryListResolver
        },
    }
];