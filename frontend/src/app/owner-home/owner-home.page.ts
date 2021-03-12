import { GroupService } from './../services/owner-services/group.service';
import { GroupDataService } from './../services/owner-services/group-data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.page.html',
  styleUrls: ['./owner-home.page.scss'],
})
export class OwnerHomePage implements OnInit {

  location_name:string = '';

  constructor(
    private navController: NavController,
    private router:Router,
    private menuController:MenuController,
    private groupDataService: GroupDataService,
    ) { 

  }

  async ngOnInit() {
    this.location_name = await this.groupDataService.get_name();
    while(this.location_name == null){
      this.location_name = await this.groupDataService.get_name();
    }
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
