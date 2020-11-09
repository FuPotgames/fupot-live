import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OwnerScheduledgamesPage } from './owner-scheduledgames.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerScheduledgamesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OwnerScheduledgamesPage]
})
export class OwnerScheduledgamesPageModule {}
