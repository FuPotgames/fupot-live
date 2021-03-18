import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserOpenendedPage } from './user-openended.page';

const routes: Routes = [
  {
    path: '',
    component: UserOpenendedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserOpenendedPage]
})
export class UserOpenendedPageModule {}
