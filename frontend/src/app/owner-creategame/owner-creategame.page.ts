import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular'

@Component({
  selector: 'app-owner-creategame',
  templateUrl: './owner-creategame.page.html',
  styleUrls: ['./owner-creategame.page.scss'],
})
export class OwnerCreategamePage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }


  scheduledGames() {
    this.navController.navigateRoot('/owner-home');
  }

  createGame() {
    this.navController.navigateRoot('/owner-questions');
  }

  ownerBack() {
    this.navController.navigateRoot('/owner-home');
  }

}
