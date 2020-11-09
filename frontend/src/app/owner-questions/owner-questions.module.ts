import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OwnerQuestionsPage } from './owner-questions.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerQuestionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OwnerQuestionsPage]
})
export class OwnerQuestionsPageModule {}
