import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.page.html',
  styleUrls: ['./user-location.page.scss'],
})
export class UserLocationPage implements OnInit {

  constructor( private navController: NavController) { }

  ngOnInit() {
  }

  goAnswer() {
    this.navController.navigateRoot('/user-answer');
  }

}
