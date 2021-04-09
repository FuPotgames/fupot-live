import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UserQuestionService } from './../services/user-services/user-question.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-user-available-questions',
  templateUrl: './user-available-questions.page.html',
  styleUrls: ['./user-available-questions.page.scss'],
})
export class UserAvailableQuestionsPage implements OnInit {

  // Declared some variables for obtaining and modying style of the questions
  questions = new Array();
  colors = ['fupot_blue','fupot_purple','fupot_pink','fupot_teal'];
  card_colors = ['blueCard','purpleCard','pinkCard','tealCard'];
  group_id: any;

  // For storing the current_timestamp from the serve
  current_timestamp: number;

  // For storing each interval ref id for destroying them later when the user leave this page
  intervals = new Array();

  
  constructor(
    private userQuestionService:UserQuestionService,
    private activatedRoute:ActivatedRoute,
    private navController:NavController
  ) { }

  async ngOnInit() {
    this.getGroupId();
    await this.getCurrentTimeStamp();
    await this.getGroupQuestions();
  }

  // Clearing up intervals here
  ngOnDestroy(){
    for(var i=0;i<this.intervals.length;i++){
      clearInterval(this.intervals[i]);
    }
  }

  // Gets and sets the group_id from the other page
  getGroupId(){
    this.activatedRoute.queryParams.subscribe(async (res)=>{
      this.group_id = res.group_id;
    });
  }

  // gets the groups questions specified by the group_id
  // as well as gets the question data from owner-question page from the route
  async getGroupQuestions() {
      var temp = await this.userQuestionService.getGroupQuestions(this.group_id).toPromise();
      var count = 0;
      for (var x = 0; x < temp.length; x++) {
        this.countdown(this.current_timestamp,String(temp[x]['ends_at_original']),x);
        temp[x]['color'] = this.colors[count];
        temp[x]['card_color'] = this.card_colors[count];
        if((this.isAvailable(temp[x].starts_at_original,temp[x].ends_at_original,this.current_timestamp) == true)){
          //Question Available
            temp[x]['available'] = true;
        }
        else{
          temp[x]['available'] = false;
        }
        
        this.questions.push(temp[x]);
        count++;
        if (count == 4) {
          count = 0;
        }
      }
      temp = null;
  
}

  // Responsible for getting and setting the current_timestamp from the server
  async getCurrentTimeStamp(){
    this.current_timestamp = Number((await this.userQuestionService.getTimestamp().toPromise())[0].slice(19));
  }

  // Checks if the question is available or not
  isAvailable(start_date,end_date,current_timestamp) {
    if(new Date(moment.unix(current_timestamp).toISOString()) > new Date(start_date) &&
    (new Date(moment.unix(current_timestamp).toISOString()) < new Date(end_date))
    ){
      return true;
    }
    else{
      return false;
    }
  }

  // redirects the user to user-answer page
  user_answer_page(i){
    this.navController.navigateForward('/user-answer',{'queryParams': this.questions[i]});
  }

  // Timer starts counting back to the end_time
  countdown(curr_time,end_time,i){
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
            document.getElementById(i).innerHTML = timer;
            
          }
          
        }, 1000));
        
    
      }
}


