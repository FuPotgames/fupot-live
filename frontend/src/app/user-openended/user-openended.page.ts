import { NavController } from '@ionic/angular';
import { UserGroupDataService } from './../services/user-services/user-group-data.service';
import { GeoLocationService } from './../services/general-services/geo-location.service';
import { UserQuestionService } from './../services/user-services/user-question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-user-openended',
  templateUrl: './user-openended.page.html',
  styleUrls: ['./user-openended.page.scss'],
})



export class UserOpenendedPage implements OnInit {
  question:any;
  user_answer:string;

  answerData;
  coordinates;
  current_timestamp: number;
  group_id;

  // For storing each interval ref id for destroying them later when the user leave this page
  intervals = new Array();

  constructor(
    private activatedRoute:ActivatedRoute,
    private userQuestionService:UserQuestionService,
    private geoLocationService:GeoLocationService,
    private userGroupDataService:UserGroupDataService,
    private navController:NavController
    ) { }

  async ngOnInit() {
    
    this.getQuestion();
    
    this.coordinates = await this.geoLocationService.getLocation();
    this.group_id = await this.userGroupDataService.get_id();
    
    this.answerData = {
      lat:this.coordinates[0],
      long:this.coordinates[1],
      question:this.question.id,
      group:this.group_id
    }

    
    await this.getCurrentTimeStamp();
    this.countdown(this.current_timestamp,this.question.ends_at_original);

    

    
  }

  // Clearing up intervals here
  ngOnDestroy(){
    for(var i=0;i<this.intervals.length;i++){
      clearInterval(this.intervals[i]);
    }
  }

  // Gets and sets the group_id from the other page
  getQuestion(){
    this.activatedRoute.queryParams.subscribe(async (res)=>{
      this.question = res;
    });
  }

  answer(){
    this.answerData['answer'] = this.user_answer;
    this.userQuestionService.answerQuestion(this.answerData).subscribe((res)=>{
      console.log(res);
      this.user_answer = '';
      this.navController.navigateBack('/user-available-questions');
    },error =>{
      console.log(error);
    })
  }

  // Responsible for getting and setting the current_timestamp from the server
  async getCurrentTimeStamp(){
    this.current_timestamp = Number((await this.userQuestionService.getTimestamp().toPromise())[0].slice(19));
  }

  // Timer starts counting back to the end_time
  countdown(curr_time,end_time){
    let endTime = new Date(end_time).getTime();
    let current_time = new Date(moment.unix(curr_time).toISOString());
    let timer = '';
  
      // Update the count down every 1 second
      this.intervals.push(setInterval(function () {
        // Get todays date and time
        current_time.setSeconds(current_time.getSeconds() + 1);
        let NOW = current_time.getTime();
        // Find the distance between now and the count down date
        let distance = endTime - NOW;
        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
  
        // If the count down is over, write some text 
        if (distance < 0) {
          clearInterval(this.interval);
        }
        else{
          // Output the result in an element with id="index"
          timer = "Time Left: "+hours + "h:"+ minutes + "m:" + seconds + "s ";
          document.getElementById("Timer").innerHTML = timer;
          
        }
        
      }, 1000));
      
  
    }

}
