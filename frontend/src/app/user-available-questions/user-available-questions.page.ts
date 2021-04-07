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
  questions = new Array();
  colors = ['fupot_blue','fupot_purple','fupot_pink','fupot_teal'];
  card_colors = ['blueCard','purpleCard','pinkCard','tealCard'];
  group_id: any;
  current_timestamp: number;

  

  constructor(
    private userQuestionService:UserQuestionService,
    private activatedRoute:ActivatedRoute,
    private navController:NavController
  ) { }

  ngOnInit() {
    this.getTimeStamp();
    this.activatedRoute.queryParams.subscribe(async (res)=>{
      console.log(res)
      this.group_id = res.group_id
      
    });
    this.getGroupQuestions();
  }

  // gets the groups questions specified by the group_id
  // as well as gets the question data from owner-question page from the route
  async getGroupQuestions() {
    this.userQuestionService.getGroupQuestions(this.group_id).subscribe(async (res) => {
      var temp = res;
      var count = 0;
      for (var x = 0; x < temp.length; x++) {
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
      console.log(this.questions)


    });
  
  
}

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

getTimeStamp(){
  this.userQuestionService.getTimestamp().subscribe((res)=>{
    this.current_timestamp = Number(res[0].slice(19));
  });
}

user_answer_page(i){
  this.navController.navigateForward('/user-answer',{'queryParams': this.questions[i]});
}

}
