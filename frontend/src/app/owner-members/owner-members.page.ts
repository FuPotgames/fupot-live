import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-owner-members',
  templateUrl: './owner-members.page.html',
  styleUrls: ['./owner-members.page.scss'],
})
export class OwnerMembersPage implements OnInit {

  constructor(private navController: NavController) {}


  ownerBack() {
    this.navController.navigateRoot (['/owner-home']);
  }

  home() {
    this.navController.navigateRoot (['/owner-home']);
  }

  ngOnInit() {
  }

}
