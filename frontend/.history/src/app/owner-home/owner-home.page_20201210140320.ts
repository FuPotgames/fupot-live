import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.page.html',
  styleUrls: ['./owner-home.page.scss'],
})
export class OwnerHomePage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  goQuestions() {
    this.navController.navigateRoot(["/owner-quesitons"]);
  }

  goNotifications() {
    this.navController.navigateRoot(["/owner-notifications"]);
  }

  goMembers() {
    this.navController.navigateRoot(["/owner-members"]);
  }

}
