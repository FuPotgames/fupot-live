import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  providers: [UserService]
})
export class SigninPage implements OnInit {

  loginValues: any;

  // tslint:disable-next-line: max-line-length
  constructor(private userService: UserService, private navController: NavController, private storage: Storage) { }

  ngOnInit() {
    this.logo_animation();
    this.loginValues = {
      username: '',
      password: '',
    };
  }

  // Login a User through our User Service
  loginUser() {
    this.userService.login(this.loginValues).subscribe(
      response => {
        // successfully loggedin a user and stored token
        if (response['token'] !== undefined){
          // storing the user token in the platform specified local storage
          this.storage.clear();
          this.storage.set('token', response.token);

          // stores the userdata in UserAuthService
          this.storage.set('username',response['username']);
          this.storage.set('email',response['email']);
          this.storage.set('phone',response['phone_number']);

          // redirecting our user after signup
          this.navController.navigateRoot('/home');
        }
      },
      error => {
        alert('Unable to log in with provided credentials.');
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
