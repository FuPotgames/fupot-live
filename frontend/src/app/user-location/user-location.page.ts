import { GeoLocationService } from './../services/general-services/geo-location.service';
import { AuthDataService } from './../services/auth-services/auth-data.service';
import { ActivatedRoute } from '@angular/router';
import { UserGroupService } from './../services/user-services/user-group.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NavController} from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.page.html',
  styleUrls: ['./user-location.page.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('500ms'))
    ])
  ]
})
export class UserLocationPage implements OnInit {
  has_group:boolean = false
  
  showMe: boolean;
  group_id:string;
  group_name:string;
  user_id:string;
  coordinates:any[];
  latitude:string;
  longitude:string;

  is_joined:boolean;

  constructor(
    private navController: NavController,
    private userGroupService:UserGroupService,
    private activatedRoute: ActivatedRoute,
    private authDataService:AuthDataService,
    private geoLocationService:GeoLocationService
    ) { }

  async ngOnInit() {
    
    this.set_group_id();
    this.coordinates = await this.geoLocationService.getLocation();
    this.user_id = await this.authDataService.get_user_id()
    

  }

  goAnswer() {
    this.navController.navigateRoot('/user-answer');
  }

  async show() {
    this.userGroupService.joinGroup(this.group_id).subscribe(res =>{
      this.has_group = true
      this.showMe = !this.showMe;
      
    });
    
  }
  set_group_id(){
    this.activatedRoute.queryParams.subscribe((res)=>{
      this.group_id = res.group_id
      this.group_name = res.name
      this.has_group = res.is_joined
      if(this.has_group){
        this.showMe = true;
      }
      else{
        this.showMe = false;
      }
    });
  }


}
