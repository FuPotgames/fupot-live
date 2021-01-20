import { GeoLocationService } from './../services/general-services/geo-location.service';
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

  constructor(
    private notificationService: NotificationService,
    private platform: Platform,
    private navController: NavController,
    private geoLocationService:GeoLocationService,
    ) {
    this.backButtonHandle();
  }
  findLocations() {
    this.navController.navigateRoot(['/user-tabs/user-tabs/user-tab2']);
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
 async ngOnInit() {
  this.notificationService.setupNotification();
  await this.geoLocationService.setLocation();

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

entertainment_page() {
  this.navController.navigateRoot(['/entertainment-locations']);
}

social_page() {
  this.navController.navigateRoot(['/social-locations']);
}

shopping_page() {
  this.navController.navigateRoot(['/shopping-locations']);
}
dining_page() {
  this.navController.navigateRoot(['/restaurant-locations']);
}


}

