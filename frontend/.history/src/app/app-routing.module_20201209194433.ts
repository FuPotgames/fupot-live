import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'user-home', loadChildren: () => import('./user-home/home.module').then( m => m.HomePageModule)},
  { path: 'owner-home', loadChildren: () => import('./owner-home/owner-home.module').then( m => m.OwnerHomePageModule)},
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'profile', loadChildren: './user-profile/profile.module#ProfilePageModule' },
  { path: 'search', loadChildren: './user-search/search.module#SearchPageModule' },
  /* { path: 'owner-home', loadChildren: './owner-tabs/owner-tabs.module#OwnerTabsPageModule' }, */
  { path: 'notifications', loadChildren: './user-notifications/notifications.module#NotificationsPageModule' },
  { path: 'games', loadChildren: './owner-games/games.module#GamesPageModule' },
  { path: 'user-grouplist', loadChildren: './user-grouplist/user-grouplist.module#UserGrouplistPageModule' },
  { path: 'owner-questions', loadChildren: './owner-questions/owner-questions.module#OwnerQuestionsPageModule' },
  { path: 'owner-scheduledgames', loadChildren: './owner-scheduledgames/owner-scheduledgames.module#OwnerScheduledgamesPageModule' },
  { path: 'owner-profile', loadChildren: './owner-profile/owner-profile.module#OwnerProfilePageModule' },
  { path: 'owner-members', loadChildren: './owner-members/owner-members.module#OwnerMembersPageModule' },
  { path: 'owner-notifications', loadChildren: './owner-notifications/owner-notifications.module#OwnerNotificationsPageModule' },
  { path: 'user-location', loadChildren: './user-location/user-location.module#UserLocationPageModule' },
  { path: 'user-answer', loadChildren: './user-answer/user-answer.module#UserAnswerPageModule' },
  { path: 'user-submit', loadChildren: './user-submit/user-submit.module#UserSubmitPageModule' },
  { path: 'test-api', loadChildren: './test-api/test-api.module#TestApiPageModule' },
  { path: 'user-tab1', loadChildren: './user-tab1/user-tab1.module#UserTab1PageModule' },
  { path: 'user-tab2', loadChildren: './user-tab2/user-tab2.module#UserTab2PageModule' },
  { path: 'user-tab3', loadChildren: './user-tab3/user-tab3.module#UserTab3PageModule' },
  { path: 'user-tab4', loadChildren: './user-tab4/user-tab4.module#UserTab4PageModule' },
  { path: 'user-tabs', loadChildren: './user-tabs/user-tabs.module#UserTabsPageModule' },
  { path: 'owner-tab1', loadChildren: './owner-tab1/owner-tab1.module#OwnerTab1PageModule' },
  { path: 'owner-tab2', loadChildren: './owner-tab2/owner-tab2.module#OwnerTab2PageModule' },
  { path: 'owner-tab3', loadChildren: './owner-tab3/owner-tab3.module#OwnerTab3PageModule' },
  { path: 'owner-tabs', loadChildren: './owner-tabs/owner-tabs.module#OwnerTabsPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
