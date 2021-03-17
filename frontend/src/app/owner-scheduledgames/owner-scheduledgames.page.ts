import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/owner-services/question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-owner-scheduledgames',
  templateUrl: './owner-scheduledgames.page.html',
  styleUrls: ['./owner-scheduledgames.page.scss'],
})
export class OwnerScheduledgamesPage implements OnInit{
  questions = new Array();
  colors = ['fupot_blue','fupot_purple','fupot_pink','fupot_teal'];
  data_from_other_page;
  constructor(
    private questionService :QuestionService,
    private activatedRoute: ActivatedRoute,
  ) { }

  
  async ngOnInit(){
    await this.getGroupQuestions();
  }

  // gets the groups questions specified by the group_id
  // as well as gets the question data from owner-question page from the route
  async getGroupQuestions() {
    this.activatedRoute.queryParams.subscribe((data) => {
        this.data_from_other_page = data;
      });
      this.questionService.getQuestions().subscribe(async (res) => {
        var temp = res;
        var count = 0;
        for (var x = 0; x < temp.length; x++) {
          temp[x]['color'] = this.colors[count];
          this.questions.push(temp[x]);
          count++;
          if (count == 3) {
            count = 0;
          }
        }
        temp = null;
        console.log(this.isEmptyObject(this.data_from_other_page));
        if(this.isEmptyObject(this.data_from_other_page) !== true){
          this.questions.unshift(this.data_from_other_page);
          this.questions.pop();
        }
        

      });
    
    
  }

  // helper functions to check if the activated route has objects or not
  isEmptyObject(obj) {
    for ( var name in obj ) {
        return false;
    }
    return true;
}

}
