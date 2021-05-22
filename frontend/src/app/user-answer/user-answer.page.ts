import { UserQuestionService } from './../services/user-services/user-question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import * as moment from 'moment';
import { GeoLocationService } from '../services/general-services/geo-location.service';
import { UserGroupDataService } from '../services/user-services/user-group-data.service';

@Component({
  selector: 'app-user-answer',
  templateUrl: './user-answer.page.html',
  styleUrls: ['./user-answer.page.scss'],
})
export class UserAnswerPage implements OnInit{
  question: any;
  current_timestamp: number;
  interval:any;

  answerData;
  coordinates;
  group_id;

  timer:string;

  options = [];

  constructor(
    private navController: NavController,
    private activatedRoute:ActivatedRoute,
    private userQuestionService:UserQuestionService,
    private geoLocationService:GeoLocationService,
    private userGroupDataService:UserGroupDataService,
     ) {}

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
    console.log(this.options)
  }

  
  getQuestion(){
    this.activatedRoute.queryParams.subscribe(async (res)=>{
      this.question = res;
      this.options.push(this.question.answers_1);
      this.options.push(this.question.answers_2);
      this.options.push(this.question.answers_3);
      this.options.push(this.question.answers_4);

      this.options = this.shuffle(this.options);
      
    });
  }
  
  answer(choosen_answer) {
    console.log(this.answerData)
    this.answerData['answer'] = choosen_answer;
    this.userQuestionService.answerQuestion(this.answerData).subscribe((res)=>{
      console.log(res);
      this.navController.navigateBack('/user-available-questions',{'queryParams': {answered:true,id:this.question.id}});
    },error =>{
      console.log(error);
    })
    
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  

  

}
