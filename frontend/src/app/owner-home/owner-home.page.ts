import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.page.html',
  styleUrls: ['./owner-home.page.scss'],
})
export class OwnerHomePage implements OnInit {

  constructor(private navController: NavController,private router:Router,private menuController:MenuController) { 

  }

  ngOnInit() {
    this.menuController.swipeGesture(true);
  }

  goQuestions() {
    this.navController.navigateRoot(["/owner-questions"]);
  }

  goNotifications() {
    this.navController.navigateRoot(["/owner-notifications"]);
  }

  goMembers() {
    this.navController.navigateRoot(["/owner-members"]);
  }

  testPage(){
    //this.navController.navigateRoot(["/test-api"]);
    //this.router.navigateByUrl("/test-api");
    this.navController.navigateForward("/test-api")
  }

}
