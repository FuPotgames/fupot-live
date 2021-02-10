import { AuthDataService } from './../services/auth-services/auth-data.service';
import { GeoLocationService } from './../services/general-services/geo-location.service';
import { NavController } from '@ionic/angular';
import { UserGroupService } from './../services/user-services/user-group.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, animateChild, state } from '@angular/animations';
import { IonInfiniteScroll } from '@ionic/angular';


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
  @ViewChild(IonInfiniteScroll,{static:false}) infiniteScroll: IonInfiniteScroll;


  page:string=null;
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

    await this.get_joined_groups();
  }
  
  // Infinite list for group messages
  async loadMore(infiniteScrollEvent) {
      this.page += 1;
      console.log('loadmore')
      await this.get_joined_groups(infiniteScrollEvent);
    
  }

  goLocation() {
    this.navController.navigateRoot('/user-location');
  }

  

  // gets paginated [5] nearby based on user's current location
  async get_joined_groups(infiniteScrollEvent?){
    this.user_id = await this.authDataService.get_user_id()
    setTimeout(() => {
      this.userGroupService.getJoinedGroups(this.latitude,this.longitude,this.page).subscribe(async res =>{
        for(var x in res['results']){
          this.establishments.push(res['results'][x])
          this.establishments.push(res['results'][x])
      }
      if(infiniteScrollEvent){
        infiniteScrollEvent.target.complete()
      }
      
      this.infiniteScroll.complete()
      
      
  },error =>{
    if(event){
      this.reload = false;
      infiniteScrollEvent.target.complete();
      infiniteScrollEvent.target.disabled = true
    }
    console.log(error)
  });
    },500);
      
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    console.log(this.infiniteScroll.disabled)
  }

  onScroll(event: any) {
    // visible height + pixel scrolled >= total height 
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log("End");
    }
}

  // Takes them to a specific group page with navigation query params
  go_to_establishment(establishment){
    this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'name':establishment.name,'address':establishment.address,'phone':establishment.phone_number,'image':establishment.group_img,'is_joined':true}});
  }

}
