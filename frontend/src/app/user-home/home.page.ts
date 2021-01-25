import { Storage } from '@ionic/storage';
import { UserGroupService } from './../services/user-services/user-group.service';
import { AuthDataService } from './../services/auth-services/auth-data.service';
import { GeoLocationService } from './../services/general-services/geo-location.service';
import { NavController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/general-services/notification.service';
import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [style({opacity: 0}), animate('.6s ease')])
    ]),
    trigger('stagger', [
      transition(':enter', [
        query(':enter', stagger('30s', [animateChild()]))
      ])
    ])]

})
export class HomePage implements OnInit {

  subscribe: any;
  user_id;
  latitude;
  longitude;
  coordinates;
  establishments=[];
  cache_establishments;

  group_joined_msg = null;

  constructor(
    private notificationService: NotificationService,
    private platform: Platform,
    private navController: NavController,
    private geoLocationService:GeoLocationService,
    private authDataService:AuthDataService,
    private userGroupService:UserGroupService,
    private storage:Storage
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
  this.cache_establishments = await this.storage.get('establishments')
  if(this.cache_establishments != null){
    this.establishments = this.cache_establishments
  }
  this.notificationService.setupNotification();
  await this.geoLocationService.setLocation();

  this.coordinates = await this.geoLocationService.getLocation()
  this.latitude = this.coordinates[0]
  this.longitude = this.coordinates[1]

  await this.get_joined_groups()

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

async get_joined_groups(){
  this.user_id = await this.authDataService.get_user_id()
  this.userGroupService.getJoinedGroups(this.latitude,this.longitude).subscribe(res =>{
    if(this.establishments.length == 0){
      this.group_joined_msg = "You haven't joined any groups yet"
    }
    this.establishments = res.results.slice(0,4);
    this.storage.set('establishments', this.establishments);
    
  });
}

go_to_establishment(establishment){
  this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'name':establishment.name,'address':establishment.address,'phone':establishment.phone_number,'image':establishment.group_img,'is_joined':true}});
}
}

