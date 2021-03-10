import { GroupDataService } from './../services/owner-services/group-data.service';
import { AuthDataService } from './../services/auth-services/auth-data.service';
import { NotificationService } from './../services/general-services/notification.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, IonList } from '@ionic/angular';

import * as moment from 'moment';
import 'moment-timezone';


@Component({
  selector: 'app-owner-notifications',
  templateUrl: './owner-notifications.page.html',
  styleUrls: ['./owner-notifications.page.scss'],
})
export class OwnerNotificationsPage implements OnInit {
  @ViewChild(IonList, {read: ElementRef,static:false}) list: ElementRef;
  scrollTo = null;

  messageData = {};
  msg:string='';
  group_id:string; // for retrieving the id from the groupData service
  page = 1;
  messages = new Array();

  constructor(
    private navController: NavController,
    private notificationService: NotificationService,
    private groupDataService :GroupDataService,
    private zone: NgZone
    ) { }

  ownerBack() {
    this.navController.navigateRoot('/owner-home');
  }

  async onSubmit(){
    this.group_id = await this.groupDataService.get_id();
    this.messageData = {
      title:'',
      body: this.msg,
      extra_data:'none'
    };
    await this.sendGroupMessages(this.group_id, this.messageData);
    this.msg = '';
    
  }

  ScrollToBottom() {
      
      let arr = this.list.nativeElement.children;
      let item = arr[this.scrollTo];
      item.scrollIntoView();
      
      console.log(item)
      
  }
  

  async ngOnInit() {
    this.group_id = await this.groupDataService.get_id();
    await this.getGroupMessages();
    console.log(this.messages);
  }

  ionViewDidLoad()
  {
     setTimeout(() => {
      var container = document.getElementById('content');
      container.scrollTop = container.scrollHeight; 

     }, 1000);
  }

  

  // Sends the group message to specific group by group id
  async sendGroupMessages(group_id,messageData) {
    this.notificationService.sendGroupMessages(group_id,messageData).subscribe(async res => {
      this.messageData['message'] = this.messageData['body']
      
      this.messages.push(this.messageData);
      this.messages.copyWithin(0,5)
      
      console.log(this.messages);

    }, error => {
      console.log('Something went wrong');
    });
  }

  // Gets the group messages
  async getGroupMessages(infiniteScroll?) {
    this.notificationService.getGroupMessages(this.group_id,this.page).subscribe(async res => {
        for(var x in res){
          var zone_name =  moment.tz.guess();
          var utcDate = res[x].created_at;  // ISO-8601 formatted date returned from server
          var localDate = new Date(utcDate);
          res[x].created_at = localDate.toLocaleString('en-US', { timeZone: zone_name })
          this.messages.push(res[x]);
        }
        if (infiniteScroll) {
          infiniteScroll.target.complete();
          infiniteScroll.target.disabled = true;
        }
      
    }, error => {
        infiniteScroll.target.disabled = true;
    });
  }

  // Infinite list for group messages
  loadMore(infiniteScroll) {
    this.page++;
    this.getGroupMessages(infiniteScroll);
  }

}
