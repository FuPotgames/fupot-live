import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UserGroupService } from '../services/user-services/user-group.service';
import { GeoLocationService } from '../services/general-services/geo-location.service';
import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';

@Component({
  selector: 'app-restaurant-locations',
  templateUrl: './restaurant-locations.page.html',
  styleUrls: ['./restaurant-locations.page.scss'],
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
export class RestaurantLocationsPage implements OnInit {
  page=1;
  latitude:string;
  longitude:string;
  coordinates;
  reload:boolean = true;
  establishment_type:string = "restaurant"

  establishments = []
  constructor(private userGroupService:UserGroupService,private geoLocationService:GeoLocationService, private navController:NavController) { }

  async ngOnInit() {
    this.coordinates = await this.geoLocationService.getLocation()
    this.latitude = this.coordinates[0]
    this.longitude = this.coordinates[1]

    await this.searchGroups();
  }

  // Infinite list for group messages
  async loadMore(event) {
    if(this.reload != false){
      this.page += 1;
      this.searchGroups(event);
    }
    
  }

  goLocation() {
    this.navController.navigateRoot('/user-location');
  }

  

  // gets paginated [5] nearby based on user's current location
  async searchGroups(event?) {
    this.userGroupService.searchGroups(this.latitude,this.longitude,undefined,this.page,this.establishment_type).subscribe(async res => {
      
      for(var x in res['results']){
          this.establishments.push(res['results'][x])
      }
      if(event){
        if((res.next === null)){
          this.reload = false;
          event.target.complete();
          event.target.disabled = true
        }
      }
  },error =>{
    if(error){
      this.reload = false;
      event.target.complete();
      event.target.disabled = true
    }
  });
  }

  // Takes them to a specific group page with navigation query params
  go_to_establishment(establishment){
    this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'name':establishment.name,'address':establishment.address,'phone':establishment.phone_number,'image':establishment.group_img,'is_joined':true}});
  }

}
