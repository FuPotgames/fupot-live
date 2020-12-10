import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserGrouplistPage } from './user-grouplist.page';
import { HomePageModule } from '../user-home/home.module';

const routes: Routes = [
  {
    path: '',
    component: UserGrouplistPage
  },

  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HomePageModule,
    Router,

  ],
  declarations: [UserGrouplistPage]
})
export class UserGrouplistPageModule {}
