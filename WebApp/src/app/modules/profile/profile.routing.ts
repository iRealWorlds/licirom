import { Route } from '@angular/router';
import { ProfileComponent } from '@licirom/modules/profile/profile.component';
import { ProfileResolver } from '@licirom/modules/profile/profile.resolver';

export const profileRouting: Route[] =[
    {   
        path:'',
        component: ProfileComponent,
        resolve: {
            profile: ProfileResolver
        }
    }
];