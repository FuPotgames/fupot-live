import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserTabsPage } from './user-tabs.page';
import { UserTabsPageRoutingModule } from './user-tabs.router.module'

const routes: Routes = [
  {
    path: '',
    component: UserTabsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    UserTabsPageRoutingModule
  ],
  declarations: [UserTabsPage]
})
export class UserTabsPageModule {}
