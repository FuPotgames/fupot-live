import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserAvailableQuestionsPage } from './user-available-questions.page';

const routes: Routes = [
  {
    path: '',
    component: UserAvailableQuestionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserAvailableQuestionsPage]
})
export class UserAvailableQuestionsPageModule {}
