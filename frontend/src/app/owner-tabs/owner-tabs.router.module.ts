import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerTabsPage } from './owner-tabs.page';


const routes: Routes = [

  {
    path: 'owner-tabs',
    component: OwnerTabsPage,
    children: [
      {
        path: 'owner-tab1',
        children: [
          {
            path: '',
            loadChildren: '../owner-home/owner-home.module#OwnerHomePageModule'
          }
        ]
      },
      {
        path: 'owner-tab2',
        children: [
          {
            path: '',
            loadChildren: '../owner-games/games.module#GamesPageModule'
          }
        ]
      },
      {
        path: 'owner-tab3',
        children: [
          {
            path: '',
            loadChildren: '../owner-profile/owner-profile.module#OwnerProfilePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/owner-tabs/owner-tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/owner-tabs/owner-tabs/owner-tab1',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OwnerTabsPageRoutingModule {}

