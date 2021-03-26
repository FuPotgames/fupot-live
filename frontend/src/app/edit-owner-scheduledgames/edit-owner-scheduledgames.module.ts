import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditOwnerScheduledgamesPage } from './edit-owner-scheduledgames.page';

const routes: Routes = [
  {
    path: '',
    component: EditOwnerScheduledgamesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditOwnerScheduledgamesPage]
})
export class EditOwnerScheduledgamesPageModule {}
