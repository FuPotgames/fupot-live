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
/* i set this up the same on owner-creategame.ts but not working here */

  createGame() {
    this.navController.navigateRoot('/owner-creategame');
  }

  sendNotification() {
    this.navController.navigateRoot('/owner-home');
  }

  groupMembers() {
    this.navController.navigateRoot('/owner-home');
  }

  goGames() {
    this.navController.navigateRoot('/owner-games')
  }

  /*
    Clears out the user by changing token to null value and logout the user
  */
  signout() {
    this.storage.set('token', null);
    this.navController.navigateRoot('/signup');
  }

}
