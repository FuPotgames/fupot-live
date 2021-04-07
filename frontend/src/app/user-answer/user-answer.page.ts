import { UserQuestionService } from './../services/user-services/user-question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-user-answer',
  templateUrl: './user-answer.page.html',
  styleUrls: ['./user-answer.page.scss'],
})
export class UserAnswerPage implements OnInit {
  question: any;
  current_timestamp: number;
  interval:any;

  constructor(
    private navController: NavController,
    private activatedRoute:ActivatedRoute,
    private userQuestionService:UserQuestionService
     ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(async (res)=>{
      this.question = res;
    });
    this.getTimeStamp();
  }

  ngOnDestroy(){
    clearInterval(this.interval);
  }

  answer() {
    this.navController.navigateRoot(['/user-submit']);
  }

  async getTimeStamp(){
    this.userQuestionService.getTimestamp().subscribe((res)=>{
      this.current_timestamp = Number(res[0].slice(19));
      this.countdown(this.current_timestamp,String(this.question.ends_at_original));
    });
  }

  countdown(curr_time,end_time){
    let endTime = new Date(end_time).getTime();
    let current_time = new Date(moment.unix(curr_time).toISOString());
      // Update the count down every 1 second
      this.interval = setInterval(function () {
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
          // Output the result in an element with id="demo"
        console.log(days + "d " + hours + "h "
          + minutes + "m " + seconds + "s ");
        }
      }, 1000);
    }

  

}
