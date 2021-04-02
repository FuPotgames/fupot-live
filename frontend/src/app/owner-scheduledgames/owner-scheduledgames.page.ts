import { QuestionDataService } from './../services/owner-services/question-data.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/owner-services/question.service';

@Component({
  selector: 'app-owner-scheduledgames',
  templateUrl: './owner-scheduledgames.page.html',
  styleUrls: ['./owner-scheduledgames.page.scss'],
})
export class OwnerScheduledgamesPage implements OnInit{
  questions = new Array();
  colors = ['fupot_blue','fupot_purple','fupot_pink','fupot_teal'];
  card_colors = ['blueCard','purpleCard','pinkCard','tealCard'];

  question_index;
  question_delete_status: any;
  constructor(
    private questionService :QuestionService,
    private navController:NavController,
    private questionDataService:QuestionDataService
    
  ) { }

  
  async ngOnInit(){
    await this.getGroupQuestions();

  }

  ionViewWillEnter(){
    // Continue work on passing question from edit page to schedule page
    var x = this.questionDataService._questions;
    var updated_question = x;

    try{
      let itemIndex = this.questions.findIndex(item => item.id == updated_question.id);
      this.questions[itemIndex] = updated_question;
    }
    catch(e){
    }
      this.question_index = this.questionDataService._question_index;
      this.question_delete_status = this.questionDataService._question_delete_status;
      if(this.question_delete_status == 0){
          this.questions.splice(this.question_index,1);
          this.questionDataService._question_delete_status = -1;
      }


    
  }

  // gets the groups questions specified by the group_id
  // as well as gets the question data from owner-question page from the route
  async getGroupQuestions() {
      this.questionService.getQuestions().subscribe(async (res) => {
        var temp = res;
        var count = 0;
        for (var x = 0; x < temp.length; x++) {
          temp[x]['color'] = this.colors[count];
          temp[x]['card_color'] = this.card_colors[count];
          this.questions.push(temp[x]);
          count++;
          if (count == 4) {
            count = 0;
          }
        }
        temp = null;
      });
    
    
  }

  go_to_edit_page(i){
    this.questionDataService._question_index = i;
    var question = this.questions[i];
    var is_openEnded;
    for(var q in question){
      if(((q === 'answers_4') && (question[q] === ''))){
        is_openEnded = true;
        question['is_openEnded'] = is_openEnded;
      }
      if(((q === 'answers_4') && (question[q] !== ''))){
        is_openEnded = false;
        question['is_openEnded'] = is_openEnded;
      }
      
    }
    this.navController.navigateForward('/edit-owner-scheduledgames',{'queryParams': question});
  }

}
