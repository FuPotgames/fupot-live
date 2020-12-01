import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerHomePage } from './owner-home.page';

const routes: Routes = [

    {
        path: 'tabs',
        component: OwnerHomePage,
        children: [
            {
                path: 'questions',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../owner-questions/owner-questions.module').then(m => m.OwnerQuestionsPageModule)
                    }
                ]
            },
            
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../owner-profile/owner-profile.module').then(m => m.OwnerProfilePageModule)
                    }
                ]
            },
            {
                path: '', 
                redirectTo:'questions',
                pathMatch: 'full'
            }
            
        ]
    },
    {
        path: '',
        redirectTo: 'questions',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OwnerHomeRoutingModule {}