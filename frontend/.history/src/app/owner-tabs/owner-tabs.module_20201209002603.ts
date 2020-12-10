import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OwnerTabsPage } from './owner-tabs.page';
import { OwnerTabsPageRoutingModule } from './owner-tabs.router.module'
const routes: Routes = [
  {
    path: '',
    component: OwnerTabsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    OwnerTabsPageRoutingModule
  ],
  declarations: [OwnerTabsPage]
})
export class OwnerTabsPageModule {}
