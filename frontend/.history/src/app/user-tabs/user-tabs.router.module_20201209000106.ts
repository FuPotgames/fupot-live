import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTabsPage } from './user-tabs.page';


const routes: Routes = [

  {
    path: 'user-tabs',
    component: UserTabsPage,
    children: [
      {
        path: 'user-tab1',
        children: [
          {
            path: '',
            loadChildren: '../user-home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'user-tab2',
        children: [
          {
            path: '',
            loadChildren: '../user-search/search.module#SearchPageModule'
          }
        ]
      },
      {
        path: 'user-tab3',
        children: [
          {
            path: '',
            loadChildren: '../user-notifications/notifications.module#NotificationsPageModule'
          }
        ]
      },
      {
        path: 'user-tab4',
        children: [
          {
            path: '',
            loadChildren: '../user-profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/user-tabs/user-tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/user-tabs/user-tabs/user-tab1',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserTabsPageRoutingModule {}

