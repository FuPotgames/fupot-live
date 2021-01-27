import { AuthService } from './../services/auth-services/auth.service';
import { AuthDataService } from './../services/auth-services/auth-data.service';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  providers: [AuthService]
})
export class SignupPage implements OnInit {
  registerValues: any;
  userStatus:any;
  // tslint:disable-next-line: max-line-length
  constructor(
    private authService: AuthService,
    private authDataService:AuthDataService, 
    private navController: NavController,
    private menuController:MenuController
    ) {
     
    }

  // starts up our signup page with logo animation and setting default input values
  ngOnInit() {
    this.logo_animation();
    this.menuController.swipeGesture(false);
    this.registerValues = {
      email: '',
      username: '',
      password: '',
      password2: '',
      phone_number: ''
    };
    this.isLoggedIn();
  }
  // Checking at the beginning of our app to see if user is loggedin with token
  // if they are redirect them to our home page

  async isLoggedIn(){
    var user_type = await this.authDataService.get_user_type();
    var is_verified = await this.authDataService.get_is_verified();
    var token = await this.authDataService.get_token();
    console.log(user_type)
    if(is_verified){
      if((user_type == 'asUser')){
        this.navController.navigateRoot('/user-tabs');
      }
      else if((user_type == 'asOwner')){
        this.navController.navigateRoot('/owner-tabs');
      }
    }
    else if(!is_verified && (token != null || token != undefined)){
      this.navController.navigateRoot('/verification');
    }
    
  }
  // Register a New User through our User Service
  async registerNewUser() {
    console.log(this.userStatus);
    if (this.userStatus != undefined){
      this.authService.register(this.registerValues).subscribe(
        async response => {
          console.log(response);
          // successfully registered a user and stored token
          if (response['response'] !== undefined) {
              // stores the userdata in localstorage
              await this.authDataService.set_user_id(response["id"]);
              await this.authDataService.set_username(response["username"]);
              await this.authDataService.set_email(response["email"]);
              await this.authDataService.set_phone(response["phone_number"]);
              await this.authDataService.set_token(response["token"]);
              await this.authDataService.set_is_verified(response["verified"]);
              await this.authDataService.set_user_type(response["user_type"]);
  
              
              if (this.userStatus == 'asUser'){
                // redirecting our user after signup
                console.log('user page');
                this.navController.navigateRoot('/verification');
                this.menuController.swipeGesture(true);
              }
              else{
                // redirecting our user after signup
                console.log('owner page');
                //this.navController.navigateRoot('/owner-tabs');
                this.navController.navigateRoot('/verification');
                this.menuController.swipeGesture(true);
              }
              
              
              
              
              
            } 
            // shows alert if email and username already exists
            else if ((response['email'] !== undefined) && (response['username'] !== undefined)) {
              alert('Email and Username already exist!');
            }
            // shows alert if only email already exists 
            else if (response['email'] !== undefined) {
              alert(response['email']);
            } 
            // shows alert if only username already exists 
            else if (response['username'] !== undefined) {
              alert(response['username']);
            }
            // shows alert if only username already exists 
            else if (response['error'] !== undefined) {
              alert(response['error']);
            }
        }, error => {
          console.log(error);
        }
      );
    }
    else{
      alert('Choose a user type');
    }
  }

  // Animating our FuPotLive Logo
  logo_animation() {
    const logo = document.querySelector('#signup_logo_animation');
    const animateLogo = logo.animate({
      opacity: [0.5, 1],
      transform: ['scale(0.7)', 'scale(1)'],
    }, {
    direction: 'alternate',
    duration: 1000,
    iterations: Infinity,
  });
  }

  segmentChanged($event){
    this.userStatus =  event['detail'].value;
    this.registerValues['user_type'] = this.userStatus
  }

}
