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
/* Should route user to search page but idk why it isnt working*/
  findLocations() {
    this.navController.navigateRoot(['/search']);
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

