import { GroupService } from './../services/owner-services/group.service';
import { GroupDataService } from './../services/owner-services/group-data.service';
import { AuthService } from './../services/auth-services/auth.service';
import { AuthDataService } from './../services/auth-services/auth-data.service';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

import { Plugins} from '@capacitor/core';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  providers: [AuthService]
})
export class SigninPage implements OnInit {

  groupData: {};  // for creating group purposes
  has_group = true; // group creation helper
  establishment_type:string;

  loginValues: any;

  // tslint:disable-next-line: max-line-length
  constructor(
    private authService: AuthService,
     private authDataService:AuthDataService,
     private navController: NavController,
     private menuController:MenuController,
     private groupDataService:GroupDataService,
     private groupService:GroupService
     ) { }

  ngOnInit() {
    this.logo_animation();
    this.menuController.swipeGesture(false);
    // Gets and sets the values (we have to make it only for the first time) for creating group purpose
    this.groupData = {
      name: '',
      address: '',
      establishment_type: '',
      latitude: '',
      longitude: ''
    };
    this.loginValues = {
      username: '',
      password: '',
    };
  }

  // Login a User through our User Service
  async loginUser() {
    this.authService.login(this.loginValues).subscribe(
      async response => {
        // successfully loggedin a user and stored token
        if (response['token'] !== undefined){
          // storing the user token in the platform specified local storage
          await this.authDataService.clear_token();

          // stores the userdata in localstorage
          await this.authDataService.set_user_id(response["id"]);
          await this.authDataService.set_username(response["username"]);
          await this.authDataService.set_email(response["email"]);
          await this.authDataService.set_phone(response["phone_number"]);
          await this.authDataService.set_token(response["token"]);
          await this.authDataService.set_is_verified(response["verified"]);
          await this.authDataService.set_user_type(response["user_type"]);

          if(response["verified"]){
            if(response["user_type"] == 'asOwner'){
              // redirecting our user after signup
              await this.createGroup(this.groupData);
              this.navController.navigateRoot('/owner-tabs');
              this.menuController.swipeGesture(true);
            }
            else if(response["user_type"] == 'asUser'){
              // redirecting our user after signup
              this.navController.navigateRoot('/user-tabs');
              this.menuController.swipeGesture(true);
            }
          }
          else{
            this.navController.navigateRoot('/verification');
          }

          
        }
      },
      error => {
        alert('Unable to log in with provided credentials.'+ error);
      }
    );
  }

  logo_animation(){
    var logo = document.querySelector('#signin_logo_animation');
    var animate_logo = logo.animate({
      opacity: [0.5, 1],
      transform: ['scale(0.7)', 'scale(1)'],
    }, {
    direction: 'alternate',
    duration: 1000,
    iterations: Infinity,
  });
  }


  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.groupData['latitude'] = position.coords.latitude
    this.groupData['longitude'] = position.coords.longitude
  }

  /*
  Creates a Group and saves the group properties in the groupData service and return a json response
  Also, if the group already exists, it just gets the group properties and sets it to groupData service
  as well
  */
 
 async createGroup(groupData?) {

    await this.getLocation();
  this.groupService.createGroup(groupData).subscribe(async res => {
    try{
      if (res['1']['reponse'] == 'Group already exists with this owner'){
        await this.groupDataService.set_id(res[0].pk);
        await this.groupDataService.set_name(res[0].fields.name);
        await this.groupDataService.set_address(res[0].fields.address);
        await this.groupDataService.set_establishment_type(res[0].fields.establishment_type);
        await this.groupDataService.set_phone_number(res[0].fields.phone_number);
        await this.groupDataService.set_latitude_longitude(res[0].fields.latitude + ',' + res[0].fields.longitude);

        
      }
      else{
        await this.groupDataService.set_id(res.id);
        await this.groupDataService.set_name(res.name);
        await this.groupDataService.set_address(res.address);
        await this.groupDataService.set_establishment_type(res.establishment_type);
        await this.groupDataService.set_phone_number(res.phone_number);
        await this.groupDataService.set_latitude_longitude(res.latitude + ',' + res.longitude);

        
      }
    }
    catch(TypeError){
      this.has_group = false
      if (this.has_group == false){
        this.createGroup(this.groupData);
        this.has_group = true;
        // redirecting our user after signup
        this.navController.navigateRoot('/owner-tabs');
      }
    }
    
  }, error => {
    console.log(error);
  });
  }


}
