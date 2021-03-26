import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { QuestionService } from '../services/owner-services/question.service';
import { GroupDataService } from '../services/owner-services/group-data.service';
import * as moment from 'moment';


@Component({
  selector: 'app-edit-owner-scheduledgames',
  templateUrl: './edit-owner-scheduledgames.page.html',
  styleUrls: ['./edit-owner-scheduledgames.page.scss'],
})
export class EditOwnerScheduledgamesPage implements OnInit {
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
starts_at:any = '';
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
isOpenEnded_page_disabled: boolean = true;
ismultChoice_page_disabled: boolean = true;

constructor( 
  private navController: NavController,
  private questionService:QuestionService,
  private groupDataService:GroupDataService,
  private activatedRoute:ActivatedRoute
  ) {
      
   }

async ngOnInit() {

  
  
  this.group_id = await this.groupDataService.get_id();
  
  this.activatedRoute.queryParams.subscribe((question) => {
    console.log(question);
    for(var q in question){
      if(((q === 'is_openEnded') && (question[q] === true))){
        this.current_tab_name = 'openEnded';
        this.isOpenEnded_page_disabled = false;
      }
      if(((q === 'is_openEnded') && (question[q] === false))){
        this.current_tab_name = 'multChoice';
        this.ismultChoice_page_disabled = false;
      }
      
    }    
    this.title = 'none';
    this.prompt = question.prompt;
    this.starts_at = new Date(question.starts_at_original).toString();
    this.ends_at = new Date(question.ends_at_original).toString();
    this.has_winner = question.has_winner;
    this.winner_title = question.winner_title;
    this.loser_title = question.loser_title;
    this.winner_body = question.winner_body;
    this.loser_body = question.loser_body;
    //this.extra_data = question.extra_data;
    this.answers_1 = question.answers_1;
    this.answers_2 = question.answers_2;
    this.answers_3 = question.answers_3;
    this.answers_4 = question.answers_4;
    this.correct_answer = question.correct_answer;
    
    
  });
}

ionViewDidEnter(){
  //this.resetFieldsOnly();
  
}
ionViewWillEnter(){
  this.resetFieldsOnly();
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
                       && this.ends_at != ''){
                                          
                                        
                                          /* if(this.checked_1){
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
                                          } */
                                          if(this.has_winner === true){
                                            if(this.winner_title == '' 
                                            || this.winner_body == '' || this.loser_title == '' || this.loser_body == ''){
                                              alert("Please fill out all fields")
                                            }
                                            if(this.winner_title != '' 
                                            && this.winner_body != '' && this.loser_title != '' && this.loser_body != ''){
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
                                                //console.log(res);
                                                var temp = res;
                                                temp['color'] = 'fupot_purple';
                                                this.navController.navigateForward('/owner-scheduledgames',{'queryParams': temp});
                                          
                                              }, error => {
                                                console.log(error);
                                              });
                                            }
                                            
                                          }
                                          else{
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
                                              //console.log(res);
                                              var temp = res;
                                              temp['color'] = 'fupot_purple';
                                              this.navController.navigateForward('/owner-scheduledgames',{'queryParams': temp});
                                        
                                            }, error => {
                                              console.log(error);
                                            });
                                          }
                                          
                                          
                                      
                                          
                                        }
                                        else{
                                          alert("Please fill out all fields")
                                        }
                                        
  }

  if(this.current_tab_name == 'multChoice'){
    if(this.prompt != '' && this.starts_at != '' 
      && this.ends_at != ''
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

                        if(this.has_winner === true){
                          if(this.winner_title == '' 
                          || this.winner_body == '' || this.loser_title == '' || this.loser_body == ''){
                            alert("Please fill out all fields")
                          }
                          else if(this.correct_answer != ''){
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
                            this.questionService.createQuestion(this.group_id,this.questionData).subscribe(async res => {                                var temp = res;
                              temp['color'] = 'fupot_purple';
                              this.navController.navigateForward('/owner-scheduledgames',{'queryParams': temp});
                        
                            }, error => {
                              console.log(error);
                            });
                           }
                          else{
                            alert("Please choose a correct answer")
                          }
                        }
                        else{
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
                            this.questionService.createQuestion(this.group_id,this.questionData).subscribe(async res => {                                var temp = res;
                              temp['color'] = 'fupot_purple';
                              this.navController.navigateForward('/owner-scheduledgames',{'queryParams': temp});
                        
                            }, error => {
                              console.log(error);
                            });
                           }
                          else{
                            alert("Please choose a correct answer")
                          }
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


