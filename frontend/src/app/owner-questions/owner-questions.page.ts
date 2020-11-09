import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-owner-questions',
  templateUrl: './owner-questions.page.html',
  styleUrls: ['./owner-questions.page.scss'],
})
export class OwnerQuestionsPage implements OnInit {

  constructor( private navController: NavController) { }

  ngOnInit() {
  }

  ownerBack() {
    this.navController.navigateRoot('/owner-creategame');
  }

  
}
