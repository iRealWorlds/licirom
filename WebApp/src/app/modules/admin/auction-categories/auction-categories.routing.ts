import { Route } from '@angular/router';

export const auctionCategoriesRouting: Route[] =[
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {  path: 'list', 
    loadChildren: () => import('@licirom/modules/admin/auction-categories/category-list/category-list.module').then(m=> m.CategoryListModule),
  },
  {
   path: 'create',
    loadChildren: () => import('src/app/modules/admin/auction-categories/categories-create/categories-create.module').then(m => m.CategoriesCreateModule),
  },
  {
    path: 'details',
    loadChildren: () => import('src/app/modules/admin/auction-categories/categories-details/categories-details.module').then(m => m.CategoriesDetailsModule),
  },
  
];