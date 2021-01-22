import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-user-answer',
  templateUrl: './user-answer.page.html',
  styleUrls: ['./user-answer.page.scss'],
})
export class UserAnswerPage implements OnInit {

  constructor( private navController: NavController ) {}

  ngOnInit() {
  }

  answer() {
    this.navController.navigateRoot(['/user-submit']);
  }

}
