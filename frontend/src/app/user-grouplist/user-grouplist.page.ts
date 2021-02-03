import { AuthDataService } from './../services/auth-services/auth-data.service';
import { GeoLocationService } from './../services/general-services/geo-location.service';
import { NavController } from '@ionic/angular';
import { UserGroupService } from './../services/user-services/user-group.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';

@Component({
  selector: 'app-user-grouplist',
  templateUrl: './user-grouplist.page.html',
  styleUrls: ['./user-grouplist.page.scss'],
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
export class UserGrouplistPage implements OnInit {

  page=1;
  latitude:string;
  longitude:string;
  coordinates;
  reload:boolean = true;

  subscribe: any;
  user_id;
  establishments=[];
  cache_establishments;


  constructor(
    private userGroupService:UserGroupService,
    private navController:NavController,
    private geoLocationService:GeoLocationService,
    private authDataService:AuthDataService

  ) { }

  async ngOnInit() {
    this.coordinates = await this.geoLocationService.getLocation()
    this.latitude = this.coordinates[0]
    this.longitude = this.coordinates[1]

    this.get_joined_groups()
  }
  
  // Infinite list for group messages
  async loadMore(event) {
    if(this.reload != false){
      this.page += 1;
      this.get_joined_groups(event);
    }
    
  }

  goLocation() {
    this.navController.navigateRoot('/user-location');
  }

  

  // gets paginated [5] nearby based on user's current location
  async get_joined_groups(event?){
    this.user_id = await this.authDataService.get_user_id()
    this.userGroupService.getJoinedGroups(this.latitude,this.longitude).subscribe(res =>{
      for(var x in res.results){
        this.establishments.push(res.results[x]);
      }
      

      if(event){
        if((res.next === null)){
          this.reload = false;
          event.target.complete();
          event.target.disabled = true
        }
      }
      //this.storage.set('establishments', this.establishments);
      
    },error =>{
      if(error){
        this.reload = false;
        event.target.complete();
        event.target.disabled = true
      }
    }
    );
  }

  // Takes them to a specific group page with navigation query params
  go_to_establishment(establishment){
    this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'name':establishment.name,'address':establishment.address,'phone':establishment.phone_number,'image':establishment.group_img,'is_joined':true}});
  }

}
