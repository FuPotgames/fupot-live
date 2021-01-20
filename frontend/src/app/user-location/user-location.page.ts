import { GeoLocationService } from './../services/general-services/geo-location.service';
import { AuthDataService } from './../services/auth-services/auth-data.service';
import { ActivatedRoute } from '@angular/router';
import { UserGroupService } from './../services/user-services/user-group.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NavController} from '@ionic/angular';
import { resolve } from 'path';
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
  visibility: string = 'shown';
  display:string = 'none'
  has_group:boolean = false
  @ViewChild('draggable',{static:false}) private draggableElement: ElementRef;
  
  showMe: boolean;
  group_id:string;
  group_name:string;
  user_id:string;
  coordinates:any[];
  latitude:string;
  longitude:string;

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
    
    this.get_joined_groups();

  }

  goAnswer() {
    this.navController.navigateRoot('/user-answer');
  }

  async show() {
    this.userGroupService.joinGroup(this.group_id).subscribe(res =>{
      console.log(res);
      this.has_group = true
      this.showMe = !this.showMe;
      
    });
    
  }
  set_group_id(){
    this.activatedRoute.queryParams.subscribe((res)=>{
      this.group_id = res.group_id
      this.group_name = res.name
    });
  }
  
  get_joined_groups(){
    this.latitude = this.coordinates[0];
    this.longitude = this.coordinates[1];

    this.userGroupService.getJoinedGroups(this.latitude,this.longitude).subscribe(res =>{
      for(var x in res){
        for(var y in res[x].user){
          if(res[x].user[y] == this.user_id && (this.group_name === res[x].name)){
            //console.log("User joined this group already")
            //console.log(res)
            /* this.visibility = 'hidden'
            setTimeout(()=>{
              this.draggableElement.nativeElement.remove();
            },500) */
            this.has_group = true
            this.showMe = !this.showMe;
          }
          
        }
      }
    })
  }


}
