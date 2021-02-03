import { AuthService } from './../services/auth-services/auth.service';
import { GeoLocationService } from './../services/general-services/geo-location.service';
import { AuthDataService } from './../services/auth-services/auth-data.service';
import { ActivatedRoute } from '@angular/router';
import { UserGroupService } from './../services/user-services/user-group.service';
import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

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
  image_url:any;

  has_group:boolean = false
  showMe: boolean;
  is_joined:boolean;

  group_id:string;
  user_id:string;

  group_name:string;
  group_address:string;
  group_phone:string;

  

  coordinates:any[];
  latitude:string;
  longitude:string;


  constructor(
    private navController: NavController,
    private userGroupService:UserGroupService,
    private activatedRoute: ActivatedRoute,
    private authDataService:AuthDataService,
    private geoLocationService:GeoLocationService,
    private authService:AuthService,
    private domSanitizer:DomSanitizer
    ) { }

  async ngOnInit() {
    
    this.set_group_properties();
    this.coordinates = await this.geoLocationService.getLocation();
    this.user_id = await this.authDataService.get_user_id()
    
    var old = await this.authDataService.get_avatar();
    if(false){
      this.image_url = this.domSanitizer.bypassSecurityTrustUrl(String(old));
    }
    else{
      await this.set_image();
    }
    

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
  set_group_properties(){
    this.activatedRoute.queryParams.subscribe((res)=>{
      console.log(res)
      this.group_id = res.group_id
      this.group_name = res.name
      this.group_phone = res.phone
      this.group_address = res.address
      this.image_url = res.image
      if(this.image_url == null){
        this.image_url = this.domSanitizer.bypassSecurityTrustUrl("../../assets/people.svg");
      }
      this.has_group = res.is_joined
      if(this.has_group){
        this.showMe = true;
      }
      else{
        this.showMe = false;
      }
    });
  }

  /*
  Gets the account properties and sets it to the authData service for later use
  */
 async set_image() {
  this.convertToDataURLviaCanvas(this.image_url, "image/jpeg").then(async base64 => {
    await this.authDataService.set_avatar(base64);
    var old = await this.authDataService.get_avatar();
    this.image_url = this.domSanitizer.bypassSecurityTrustUrl(String(old));       
  });
}

// Helps to convert image url to base54 encoded string
convertToDataURLviaCanvas(url, outputFormat){
  return new Promise((resolve, reject) => {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = () => {
    let canvas = <HTMLCanvasElement> document.createElement('CANVAS'),
      ctx = canvas.getContext('2d'),
      dataURL;
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    resolve(dataURL);
    canvas = null;
  };
  img.src = url;
});
}


}
