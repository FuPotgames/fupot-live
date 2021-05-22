import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UserQuestionService } from './../services/user-services/user-question.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserGroupDataService } from '../services/user-services/user-group-data.service';

@Component({
  selector: 'app-user-available-questions',
  templateUrl: './user-available-questions.page.html',
  styleUrls: ['./user-available-questions.page.scss'],
})
export class UserAvailableQuestionsPage {

  // Declared some variables for obtaining and modying style of the questions
  questions = new Array();
  answered_questions;

  colors = ['fupot_blue','fupot_purple','fupot_pink','fupot_teal'];
  card_colors = ['blueCard','purpleCard','pinkCard','tealCard'];
  group_id: any;

  // For storing the current_timestamp from the serve
  current_timestamp: number;

  // For storing each interval ref id for destroying them later when the user leave this page
  intervals = new Array();

  is_time_over:boolean = false;
  is_time_running:boolean = true;

  
  
  constructor(
    private userQuestionService:UserQuestionService,
    private activatedRoute:ActivatedRoute,
    private navController:NavController,
    private userGroupDataService:UserGroupDataService,
  ) { }

  async ionViewWillEnter(){

    this.questions = [];
    this.answered_questions = [];

    this.getGroupId();
    this.checkIfAnswered(this.group_id);
    await this.getCurrentTimeStamp();
    await this.getGroupQuestions();

    console.log(this.is_time_over)
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
      if(res.answered != undefined){
        for(var x=0;x<this.questions.length;x++){
          this.questions[x].available = true;
          this.questions[x].answered = true;
        }
      }
      this.group_id = res.group_id;
    });
  }

  // gets the groups questions specified by the group_id
  // as well as gets the question data from owner-question page from the route
  async getGroupQuestions() {
    this.group_id = await this.userGroupDataService.get_id();
      var temp = await this.userQuestionService.getGroupQuestions(this.group_id).toPromise();
      var count = 0;
      
      for (var x = 0; x < temp.length; x++) {
        this.countdown(this.current_timestamp,String(temp[x]['ends_at_original']),x,this.is_time_over,this.is_time_running);

        

        temp[x]['color'] = this.colors[count];
        temp[x]['card_color'] = this.card_colors[count];
        
        
        var matches  = this.getMatch(temp,this.answered_questions);
        for(var i = 0; i<matches.length;i++){
            temp[matches[i]]['answered'] = true;
        }
        if((this.isAvailable(temp[x].starts_at_original,temp[x].ends_at_original,this.current_timestamp) == true)
        ){
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

  getMatch(a, b) {
  var matches = [];

  for ( var i = 0; i < a.length; i++ ) {
      for ( var e = 0; e < b.length; e++ ) {
          if ( a[i].prompt === b[e].prompt ){
            matches.push( i );
          } 
      }
  }
  return matches;
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
    var q = this.questions[i];
    if(q.answers_1 == "" && q.answers_2 == "" && q.answers_3 == "" && q.answers_4 == ""){
      //Open-Ended
      q['open-ended'] = true;
      this.navController.navigateForward('/user-openended',{'queryParams': q});
      
    }
    else{
      //Multiple Choices
      q['mult-choice'] = true;
      this.navController.navigateForward('/user-answer',{'queryParams': q});

    }
    
  }
  async checkIfAnswered(group_id){
    group_id = await this.userGroupDataService.get_id();
    this.answered_questions = await this.userQuestionService.answeredResponses(group_id).toPromise();
  }
    

  // Timer starts counting back to the end_time
  countdown(curr_time,end_time,i,is_time_over,is_time_running){
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
            is_time_over = true;
            is_time_running = false;
            
            
            document.getElementById(i).innerHTML = "Timed Out";
            document.getElementById(String(i)+String(i)).setAttribute("disabled","true");
            document.getElementById(String(i)+String(i)).style.fontSize = "11pt";
            document.getElementById(String(i)+String(i)).style.color = "black";
            document.getElementById(String(i)+String(i)).innerHTML = "Come back later"
            
                  
            
            
            
            //if(document.getElementById(i).innerHTML === "Timed Out"){
              console.log("2 timeout")
              //document.getElementById("timed_out_msg").style.color = 'black';
              //document.getElementById("timed_out_msg").style.fontSize = '11pt';
              
           // }
            //document.getElementById(i).innerHTML = "Come back later";
            clearInterval(this.interval);

          }
          else{
            is_time_over = false;
            is_time_running = true;
            // Output the result in an element with id="index"
            timer = "Time Left: "+hours + "h:"+ minutes + "m:" + seconds + "s ";
            document.getElementById(i).innerText = timer;
            
          }
          
        }, 1000));
        
    
      }
}


