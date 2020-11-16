import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-owner-notifications',
  templateUrl: './owner-notifications.page.html',
  styleUrls: ['./owner-notifications.page.scss'],
})
export class OwnerNotificationsPage implements OnInit {

  constructor(private navController: NavController) { }

  ownerBack() {
    this.navController.navigateRoot('/owner-home');
  }

  ngOnInit() {
  }

}
