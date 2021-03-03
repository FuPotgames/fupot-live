import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UserGroupService } from '../services/user-services/user-group.service';
import { GeoLocationService } from '../services/general-services/geo-location.service';
import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';
import { AuthDataService } from '../services/auth-services/auth-data.service';
import { ActivatedRoute } from '@angular/router';

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
  user_id:string;

  group_id:string;
  group_name:string;
  group_address:string;
  group_phone:string;

  has_group:boolean = false
  showMe: boolean;


  establishments = []
  constructor(private userGroupService:UserGroupService,private geoLocationService:GeoLocationService, private navController:NavController, private authDataService:AuthDataService, private activatedRoute:ActivatedRoute,) { }

  async ngOnInit() {
    this.set_group_properties();
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

  /*goLocation() {
    this.navController.navigateRoot('/user-location');
  }*/

  

  async set_group_properties(){
    this.activatedRoute.queryParams.subscribe(async (res)=>{
      this.group_id = res.group_id
      this.group_name = res.name
      this.group_phone = res.phone
      this.group_address = res.address
      
      this.has_group = res.is_joined
      if(this.has_group){
        this.showMe = true;
      }
      else{
        this.showMe = false;
      }
    });
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

          /* if((establishment != null) || (establishment != undefined)){
            var matched;
          if(res.results.length == 0){
            console.log("not joined")
            matched = false;
            this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'address':establishment.address,'name':establishment.name,'phone':establishment.phone_number,'image':establishment.group_img,'is_joined':matched}});
          }
          
            if(res.results.length > 1){
              console.log("similar group joined multiple")
              var name = res.results[0].name
              if(String(establishment.name) === String(name)){
                matched = true;
                this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'address':establishment.address,'name':establishment.name,'phone':establishment.phone_number,'image':establishment.group_img,'is_joined':matched}});
              }
            }
            
            if(res.results.length == 1){
              console.log("joined")
              if(String(establishment.name) === String(res.results[0].name)){
                matched = true;
                this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'address':establishment.address,'name':establishment.name,'phone':establishment.phone_number,'image':establishment.group_img,'is_joined':matched}});
              }
            }
          } */
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
 /* go_to_establishment(establishment){
    this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'name':establishment.name,'address':establishment.address,'phone':establishment.phone_number,'image':establishment.group_img,'is_joined':true}});
  }*/
// Takes them to a specific group page with navigation query params
async goLocation(establishment) {
  this.user_id = await this.authDataService.get_user_id()
    this.userGroupService.getJoinedGroups(this.latitude,this.longitude,null,establishment.name).subscribe(res =>{
      var matched=false;

      if(res.results.length == 0){
        console.log("not joined")
        matched = false;
        this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'address':establishment.address,'name':establishment.name,'phone':establishment.phone_number,'image':establishment.group_img,'is_joined':matched}});
      }
      
        if(res.results.length > 1){
          console.log("similar grouo joined multile")
          var name = res.results[0].name
          if(String(establishment.name) === String(name)){
            matched = true;
            this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'address':establishment.address,'name':establishment.name,'phone':establishment.phone_number,'image':establishment.group_img,'is_joined':matched}});
          }
        }
        
        if(res.results.length == 1){
          console.log("joined")
          if(String(establishment.name) === String(res.results[0].name)){
            matched = true;
            this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'address':establishment.address,'name':establishment.name,'phone':establishment.phone_number,'image':establishment.group_img,'is_joined':matched}});
          }
        }
      }
      
    )};    




  async get_joined_groups(establishment){
    this.user_id = await this.authDataService.get_user_id()
    this.userGroupService.getJoinedGroups(this.latitude,this.longitude,null,establishment.name).subscribe(res =>{
    
      for(var x in this.establishments){
        for(var y in res.results){
          if(String(this.establishments[x].name) === String(res.results[y].name)){
            var matched;
            console.log("joined")
                
            matched = true;
            this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'address':establishment.address,'name':establishment.name,'phone':establishment.phone_number,'image':establishment.group_img,'is_joined':matched}});
                
          }
        }
      }
      
        
    
    });
  }}
