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

  timer:string;

  constructor(
    private navController: NavController,
    private activatedRoute:ActivatedRoute,
    private userQuestionService:UserQuestionService
     ) {}

  ngOnInit() {
    this.getQuestion();
    console.log(this.question)
  }

  
  getQuestion(){
    this.activatedRoute.queryParams.subscribe(async (res)=>{
      this.question = res;
    });
  }
  
  answer() {
    this.navController.navigateRoot(['/user-submit']);
  }
  

  

}
