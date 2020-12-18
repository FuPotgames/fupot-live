import { NavController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/general-services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']

})
export class HomePage implements OnInit {

  subscribe: any;

  constructor(private notificationService: NotificationService, private platform: Platform, private navController: NavController) {
    this.backButtonHandle();
  }
  findLocations() {
    this.navController.navigateRoot(['/user-tabs/user-tabs/user-tab2']);
  }

  diningSearch(){
    this.navController.navigateRoot(['/search']);
  }

  allGroups() {
    this.navController.navigateRoot(['/user-grouplist']);
  }

  locationPage() {
    this.navController.navigateRoot(['/user-location']);
  }

 
  /*
    Initializes everthing related to this ts file when the owner loads into their homepage
  */
 ngOnInit() {
  this.notificationService.setupNotification();
}

/*
  Handles the back button press if the user wants to leave 
*/
backButtonHandle() {
  this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
    if (this.constructor.name === 'HomePage') {
        navigator['app'].exitApp();
    }

  });
}


}

