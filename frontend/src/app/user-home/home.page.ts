import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']

})
export class HomePage implements OnInit {
  constructor(private storage: Storage, private navController: NavController, private notificationService: NotificationService) {}
  ngOnInit() {
    this.notificationService.setupNotification();
  }
  signout() {
    this.storage.set('token', null);
    this.navController.navigateRoot('/signup');
  }



}

