import { Route } from '@angular/router';
import { CategoryListComponent } from '@licirom/modules/admin/auction-categories/category-list/category-list.component';

export const categoryListRouting: Route[] = [
    {
        path:'',
        component: CategoryListComponent
    }
];