import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OwnerCreategamePage } from './owner-creategame.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerCreategamePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OwnerCreategamePage]
})
export class OwnerCreategamePageModule {}
