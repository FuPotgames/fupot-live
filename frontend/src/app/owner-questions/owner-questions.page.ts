import { GroupDataService } from './../services/owner-services/group-data.service';
import { QuestionService } from './../services/owner-services/question.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-owner-questions',
  templateUrl: './owner-questions.page.html',
  styleUrls: ['./owner-questions.page.scss'],
})
export class OwnerQuestionsPage implements OnInit {

  // Checking all the four correct answer options
  checked_1:boolean = false;
  checked_2:boolean = false;
  checked_3:boolean = false;
  checked_4:boolean = false;


  

  questionData = {}; // for creating question purposes
  group_id:string; // for retrieving the id from the groupData service

  // Question Data
  title:string = '';
  prompt:string = '';
  starts_at:string = '';
  ends_at:string = '';
  has_winner:boolean = false;
  winner_title:string = '';
  loser_title:string = '';
  winner_body:string = '';
  loser_body:string = '';
  extra_data:string = '';
  answers_1:string = '';
  answers_2:string = '';
  answers_3:string = '';
  answers_4:string = '';
  correct_answer:string = ''
  location:any;

  // Page Segment
  selectedSegment: string = 'openEnded'
  
  // For Showing the winner or loser section in the middle of the page
  showMe: boolean;

  // Checking whether showme with checkbox closing and opening at the correct time
  clicked:boolean = !this.showMe && this.showMe;
  

  // For Keeping track of tabs segment
  current_tab_name:string = 'openEnded';
  
  constructor( 
    private navController: NavController,
    private questionService:QuestionService,
    private groupDataService:GroupDataService
    ) { }

  async ngOnInit() {
    this.group_id = await this.groupDataService.get_id();
    console.log(this.group_id)
  }


  // Listening for segment tab changes
    segmentChanged(event:any){
      console.log(event.target.value);
      this.selectedSegment=event.target.value

      if(event.target.value != ''){
         this.showMe = false;
         this.clicked= null;
      }
      this.current_tab_name = event.target.value;
      
      this.resetFieldsOnly();
      
                         
      
      

    }

    // Helper function showing and hiding the middle section
    show() {
      this.showMe = !this.showMe;
      if(this.showMe == true){
         
         this.has_winner = true;
      }
      else{
       this.has_winner = false;
      }
    }

    

    /*
  Create a Question in the database
  */
  async createQuestion() {
    if(this.current_tab_name == 'openEnded'){
      if(this.prompt != '' && this.starts_at != '' 
                         && this.ends_at != '' && this.winner_title != '' 
                                          && this.winner_body != '' && this.loser_title && this.loser_body != ''
                                          && this.correct_answer != ''){
                                            
                                          
                                            if(this.checked_1){
                                              this.correct_answer = this.answers_1;
                                            }
                                            else if(this.checked_2){
                                              this.correct_answer = this.answers_2;
                                            }
                                            else if(this.checked_3){
                                              this.correct_answer = this.answers_3;
                                            }
                                            else if(this.checked_4){
                                              this.correct_answer = this.answers_4;
                                            }
                                            
                                            this.questionData = {
                                              title: this.title,
                                              prompt: this.prompt,
                                              starts_at: String(moment(this.starts_at).format('hh:mm:A')),
                                              ends_at: String(moment(this.ends_at).format('hh:mm:A')),
                                              sent:true,
                                              has_winner: this.has_winner,
                                        
                                              winner_title: this.winner_title,
                                              loser_title: this.loser_title,
                                              winner_body: this.winner_body,
                                              loser_body: this.loser_body,
                                              extra_data: '',
                                        
                                              answers_1: this.answers_1,
                                              answers_2: this.answers_2,
                                              answers_3: this.answers_3,
                                              answers_4: this.answers_4,
                                              correct_answer: this.correct_answer,
                                              location: -88888
                                          }
                                            this.questionService.createQuestion(this.group_id,this.questionData).subscribe(async res => {
                                              console.log(res);
                                        
                                            }, error => {
                                              console.log(error);
                                            });
                                        
                                            this.navController.navigateForward('/owner-scheduledgames')
                                          }
                                          else{
                                            alert("Please fill out all fields")
                                          }
                                          
    }

    if(this.current_tab_name == 'multChoice'){
      if(this.prompt != '' && this.starts_at != '' 
        && this.ends_at != '' && this.winner_title != '' 
                         && this.winner_body != '' && this.loser_title && this.loser_body != ''
                         && this.answers_1 != '' 
                         && this.answers_2 != '' 
                         && this.answers_3 != ''
                         && this.answers_4 != ''
                         ){
                          if(this.checked_1){
                            this.correct_answer = this.answers_1;
                          }
                          else if(this.checked_2){
                            this.correct_answer = this.answers_2;
                          }
                          else if(this.checked_3){
                            this.correct_answer = this.answers_3;
                          }
                          else if(this.checked_4){
                            this.correct_answer = this.answers_4;
                          }

                          if(this.correct_answer != ''){
                            this.questionData = {
                              title: this.title,
                              prompt: this.prompt,
                              starts_at: String(moment(this.starts_at).format('hh:mm:A')),
                              ends_at: String(moment(this.ends_at).format('hh:mm:A')),
                              sent:true,
                              has_winner: this.has_winner,
                        
                              winner_title: this.winner_title,
                              loser_title: this.loser_title,
                              winner_body: this.winner_body,
                              loser_body: this.loser_body,
                              extra_data: '',
                        
                              answers_1: this.answers_1,
                              answers_2: this.answers_2,
                              answers_3: this.answers_3,
                              answers_4: this.answers_4,
                              correct_answer: this.correct_answer,
                              location: -88888
                          }
                            this.questionService.createQuestion(this.group_id,this.questionData).subscribe(async res => {
                              console.log(res);
                        
                            }, error => {
                              console.log(error);
                            });
                        
                            this.navController.navigateForward('/owner-scheduledgames')
                          }
                          else{
                            alert("Please choose a correct answer")
                          }
                          
                          
                         }

                         else{
                          alert("Please fill out all fields")
                        }
    }
    

    
  }
  

  // Clears out everthings even the checkboxes
  resetAll(){
      if(this.showMe == true || this.clicked == true){
        this.showMe = false;
        this.clicked = false;
        
      }
      else{
        this.showMe = true;
        this.clicked = true;
      }

      this.checked_1 = false;
      this.checked_2 = false;
      this.checked_3 = false;
      this.checked_4 = false;
    
    

      this.title = '';
      this.prompt = '';
      this.starts_at = '';
      this.ends_at = '';
      this.has_winner = false;

      this.winner_title = '';
      this.loser_title = '';
      this.winner_body = '';
      this.loser_body = '';
      this.extra_data = '';

      this.answers_1 = '';
      this.answers_2 = '';
      this.answers_3 = '';
      this.answers_4 = '';
      this.correct_answer = '';
  }

  // Clears only the fields only
  resetFieldsOnly(){
      this.checked_1 = false;
      this.checked_2 = false;
      this.checked_3 = false;
      this.checked_4 = false;
    
      this.title = '';
      this.prompt = '';
      this.starts_at = '';
      this.ends_at = '';
      this.has_winner = false;

      this.winner_title = '';
      this.loser_title = '';
      this.winner_body = '';
      this.loser_body = '';
      this.extra_data = '';

      this.answers_1 = '';
      this.answers_2 = '';
      this.answers_3 = '';
      this.answers_4 = '';
      this.correct_answer = '';
  }

  
    

  
  
}


