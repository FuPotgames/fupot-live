import { AuthDataService } from './../services/auth-services/auth-data.service';
import { Component, OnInit } from '@angular/core';
import { AccountCreationService } from '../services/auth-services/account-creation.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  providers: [AccountCreationService]
})
export class SigninPage implements OnInit {

  loginValues: any;

  // tslint:disable-next-line: max-line-length
  constructor(private accountCreationService: AccountCreationService, private authDataService:AuthDataService , private navController: NavController) { }

  ngOnInit() {
    this.logo_animation();
    this.loginValues = {
      username: '',
      password: '',
    };
  }

  // Login a User through our User Service
  async loginUser() {
    this.accountCreationService.login(this.loginValues).subscribe(
      async response => {
        // successfully loggedin a user and stored token
        if (response['token'] !== undefined){
          // storing the user token in the platform specified local storage
          await this.authDataService.clear_token();

          // stores the userdata in localstorage
          await this.authDataService.set_username(response["username"]);
          await this.authDataService.set_email(response["email"]);
          await this.authDataService.set_phone(response["phone_number"]);
          await this.authDataService.set_token(response["token"]);

          // redirecting our user after signup
          this.navController.navigateRoot('/user-home');
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
