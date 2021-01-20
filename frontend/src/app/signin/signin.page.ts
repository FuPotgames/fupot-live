import { AuthService } from './../services/auth-services/auth.service';
import { AuthDataService } from './../services/auth-services/auth-data.service';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  providers: [AuthService]
})
export class SigninPage implements OnInit {

  loginValues: any;

  // tslint:disable-next-line: max-line-length
  constructor(
    private authService: AuthService,
     private authDataService:AuthDataService,
     private navController: NavController,
     private menuController:MenuController
     ) { }

  ngOnInit() {
    this.logo_animation();
    this.menuController.swipeGesture(false);
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


}
