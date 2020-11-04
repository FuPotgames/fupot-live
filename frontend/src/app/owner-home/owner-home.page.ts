import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './../services/user-auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NotificationService } from '../services/notification.service';



@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.page.html',
  styleUrls: ['./owner-home.page.scss'],
})
export class OwnerHomePage implements OnInit {

  constructor(private storage: Storage, private navController: NavController, private notificationService: NotificationService) {}

  /*
    Initializes everthing related to this ts file when the owner loads into their homepage
  */
  ngOnInit() {
    this.notificationService.setupNotification();
  }

  /*
    Clears out the user by changing token to null value and logout the user
  */
  signout() {
    this.storage.set('token', null);
    this.navController.navigateRoot('/signup');
  }

}
