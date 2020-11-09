import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'user-home', loadChildren: () => import('./user-home/home.module').then( m => m.HomePageModule)},
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'profile', loadChildren: './user-profile/profile.module#ProfilePageModule' },
  { path: 'search', loadChildren: './user-search/search.module#SearchPageModule' },
  { path: 'owner-home', loadChildren: './owner-home/owner-home.module#OwnerHomePageModule' },
  { path: 'notifications', loadChildren: './user-notifications/notifications.module#NotificationsPageModule' },
  { path: 'games', loadChildren: './owner-games/games.module#GamesPageModule' },
  { path: 'user-grouplist', loadChildren: './user-grouplist/user-grouplist.module#UserGrouplistPageModule' },
  { path: 'owner-questions', loadChildren: './owner-questions/owner-questions.module#OwnerQuestionsPageModule' },
  { path: 'owner-creategame', loadChildren: './owner-creategame/owner-creategame.module#OwnerCreategamePageModule' },
  { path: 'owner-scheduledgames', loadChildren: './owner-scheduledgames/owner-scheduledgames.module#OwnerScheduledgamesPageModule' },
  { path: 'owner-profile', loadChildren: './owner-profile/owner-profile.module#OwnerProfilePageModule' },
  { path: 'owner-members', loadChildren: './owner-members/owner-members.module#OwnerMembersPageModule' },
  { path: 'owner-notifications', loadChildren: './owner-notifications/owner-notifications.module#OwnerNotificationsPageModule' },
  { path: 'user-joingame', loadChildren: './user-joingame/user-joingame.module#UserJoingamePageModule' },
  { path: 'user-location', loadChildren: './user-location/user-location.module#UserLocationPageModule' },
  { path: 'user-answer', loadChildren: './user-answer/user-answer.module#UserAnswerPageModule' },
  { path: 'user-submit', loadChildren: './user-submit/user-submit.module#UserSubmitPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
