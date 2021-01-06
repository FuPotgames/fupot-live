import { NavController } from '@ionic/angular';
import { AuthDataService } from './../services/auth-services/auth-data.service';
import { AuthService } from './../services/auth-services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  email:string;
  image_url:any = "../../assets/people.svg";
  constructor(
    private authService:AuthService,
    private authDataService:AuthDataService,
    private navController:NavController
    ) { }

  async ngOnInit() {
    this.email = await this.authDataService.get_email();
  }

  /* After registration or login, the user/owner would be presented with a page saying verify email address,
  if they didn't receive their email verfication link, they could ask for resend another one */
  async resendConfirmEmail(email = this.email) {
    this.authService.resendConfirmEmail(email).subscribe(async res => {
      console.log(res);

    }, error => {
      console.log(error);
    });
  }

  /*
  Gets the account properties and sets it to the authData service for later use
  */
 async getAccountProperties() {
  this.authService.getAccountProperties().subscribe(async res => {
    await this.authDataService.set_email(res.email);
    await this.authDataService.set_username(res.username);
    await this.authDataService.set_is_verified(res.is_verified);

    if ((res.user_type == 'asUser') && (res.is_verified == true)){
      // redirecting our user after the user is verified
      this.navController.navigateRoot('/user-tabs');
    }
    else if ((res.user_type == 'asOwner') && (res.is_verified == true)){
      // redirecting our user after the owner is verified
      this.navController.navigateRoot('/owner-signup');
    }


  }, error => {
    console.log(error);
  });
}

}
