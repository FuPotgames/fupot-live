import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  providers: [UserService]
})
export class SignupPage implements OnInit {
  registerValues: any;
  // tslint:disable-next-line: max-line-length
  constructor(private userService: UserService, private navController: NavController, private storage: Storage) {}

  // starts up our signup page with logo animation and setting default input values
  ngOnInit() {
    this.logo_animation();
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
  isLoggedIn(){
    this.storage.get('token').then((token)=>{
      if(token !== null){
        console.log(token);
        this.navController.navigateRoot('/home');
      }
    });
  }
  // Register a New User through our User Service
  registerNewUser() {
    this.userService.register(this.registerValues).subscribe(
      response => {
        // successfully registered a user and stored token
        if (response['response'] !== undefined) {
            // stores the userdata in localstorage
            this.storage.set('username',response["username"]);
            this.storage.set('email',response["email"]);
            this.storage.set('phone',response["phone_number"]);

            // storing the user token in the platform specified local storage
            this.storage.set('token', response.token);

            // redirecting our user after signup
            this.navController.navigateRoot('/home');
          } 
          // shows alert if email and username already exists
          else if ((response['email'] !== undefined) && (response['username'] !== undefined)) {
            alert('Email and Username already exist!');
          }
          // shows alert if only email already exists 
          else if (response['email'] !== undefined) {
            alert('Email already exist!');
          } 
          // shows alert if only username already exists 
          else if (response['username'] !== undefined) {
            alert('Username already exist!');
          }
      },
      error => {
        // shows phone number already exists 
        if (error['error'] != undefined) {
          alert('Phone number already exist!');
        }
      }
    );
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

}
