import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OwnerHomePage } from './owner-home.page';

import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { OwnerHomeRoutingModule } from './owner-home-routing.module';


const routes: Routes = [
  {
    path: '',
    component: OwnerHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnerHomeRoutingModule
  ],
  declarations: [OwnerHomePage]
})

export class OwnerHomePageModule {}

