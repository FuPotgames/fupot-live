import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  goQuestions() {
    this.navController.navigateRoot(["/owner-questions"]);
  }

  goSaved() {
    this.navController.navigateRoot(["/owner-scheduledgames"]);
  }

  goGuidelines() {
    this.navController.navigateRoot(["/owner-guidelines"]);
  }
}
