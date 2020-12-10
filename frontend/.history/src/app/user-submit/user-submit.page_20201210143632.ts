import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-submit',
  templateUrl: './user-submit.page.html',
  styleUrls: ['./user-submit.page.scss'],
})
export class UserSubmitPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  goHome() {
    this.navController.navigateRoot(["/user-tabs"]);
  }
}
