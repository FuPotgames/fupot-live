import { AuthService } from './../services/auth-services/auth.service';
import { environment } from './../../environments/environment';
import { AuthDataService } from './../services/auth-services/auth-data.service';
import { QuestionService } from './../services/owner-services/question.service';
import { GroupDataService } from './../services/owner-services/group-data.service';
import { GroupService } from './../services/owner-services/group.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuestionDataService } from '../services/owner-services/question-data.service';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Platform, ActionSheetController } from '@ionic/angular';
const { Camera } = Plugins;

import { DomSanitizer } from '@angular/platform-browser'; 


@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.page.html',
  styleUrls: ['./test-api.page.scss']
})
export class TestApiPage implements OnInit {
  image_url:any = "../../assets/people.svg";
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  groupData: {};  // for creating group purposes
  questions: [];  // for storing list of dictionaies of questions
  questionData = {}; // for creating question purposes
  editAccountData = {}; // for editing account properties
  group_id:string; // for retrieving the id from the groupData service

  has_group = true; // group creation helper
  constructor(
    private groupService: GroupService,
    private groupDataService: GroupDataService,
    private questionService:QuestionService,
    private questionDataService:QuestionDataService,
    private authService:AuthService,
    private authDataService:AuthDataService,


    private plt: Platform, private actionSheetCtrl: ActionSheetController,private domSanitizer:DomSanitizer
    ) { }
  
  async ngOnInit() {
    // Gets and sets the values (we have to make it only for the first time) for creating group purpose
    this.groupData = {
        name: 'khkhk',
        address: '3243 Blvd Rd, Woodbridge, VA 22191',
        establishment_type: 'ka2222kaka',
        latitude: 389.6414602228275342,
        longitude: -770.3016720222201729
    };
    this.editAccountData = {
      username: 'ppppppp',
      email: 'papito@gmail.com'
    };
    // Gets and sets the values from the frontend for creating question purpose
    this.questionData = {
        title: 'natures',
        prompt: '2000 Blvd Rd, Woodbridge, VA 22191',
        starts_at: '08:00PM',
        ends_at: '08:00PM',
        sent:true,
        has_winner:true,

        winner_title: 'Winner',
        loser_title: 'Loser',
        winner_body: 'Free Dessert',
        loser_body: 'Sorry...',
        extra_data: '',

        answers_1: -770.3016720222201729,
        answers_2: '2000 Blvd Rd, Woodbridge, VA 22191',
        answers_3: 'ka2222kaka',
        answers_4: 389.6414602228275342,
        correct_answer: -770.3016720222201729,
        location: -88888
    }

    await this.createGroup();
    this.group_id = await this.groupDataService.get_id();
    await this.getQuestions();

    await this.getAccountProperties();
    
    
  }
  /*
  Creates a Group and saves the group properties in the groupData service and return a json response
  Also, if the group already exists, it just gets the group properties and sets it to groupData service
  as well
  */
 
  async createGroup(groupData?) {
    this.groupService.createGroup(groupData).subscribe(async res => {
      try{
        if (res['1']['reponse'] == 'Group already exists with this owner'){
          console.log('already exists just setting the group info');
          await this.groupDataService.set_id(res[0].pk);
          await this.groupDataService.set_name(res[0].fields.name);
          await this.groupDataService.set_address(res[0].fields.address);
          await this.groupDataService.set_establishment_type(res[0].fields.establishment_type);
          await this.groupDataService.set_phone_number(res[0].fields.phone_number);
          await this.groupDataService.set_latitude_longitude(res[0].fields.latitude + ',' + res[0].fields.longitude);
        }
        else{
          await this.groupDataService.set_id(res.id);
          await this.groupDataService.set_name(res.name);
          await this.groupDataService.set_address(res.address);
          await this.groupDataService.set_establishment_type(res.establishment_type);
          await this.groupDataService.set_phone_number(res.phone_number);
          await this.groupDataService.set_latitude_longitude(res.latitude + ',' + res.longitude);
        }
      }
      catch(TypeError){
        console.log('creating group just and setting the group info');
        this.has_group = false
        if (this.has_group == false){
          this.createGroup(this.groupData);
          this.has_group = true;
        }
      }
      
    }, error => {
      console.log(error);
    });
  }

  /*
  Edit the Group and saves the group properties in the groupData service and return a json response
  Also, if the group already exists, it just gets the group properties and sets it to groupData service
  as well
  */
  async editGroup() {
    this.groupService.editGroup(this.group_id,this.groupData).subscribe(async res => {
      await this.groupDataService.set_name(res.name);
      await this.groupDataService.set_address(res.address);
      await this.groupDataService.set_establishment_type(res.establishment_type);
      await this.groupDataService.set_phone_number(res.phone_number);
      await this.groupDataService.set_latitude_longitude(res.latitude + ',' + res.longitude);

    }, error => {
      console.log(error);
    });
  }
  /*
  Create a Question in the database
  */
  async createQuestion() {
    this.questionService.createQuestion(this.group_id,this.questionData).subscribe(async res => {
      console.log(res);

    }, error => {
      console.log(error);
    });
  }
  /*
  Edit Question and set it to the current questions list and as well as to the questionData service
  */
  async editQuestion() {
    this.questionService.editQuestion(this.questionDataService.id,this.questionData).subscribe(async res => {
      const modify_edit_question_data:any = this.questions;
      var edit_question_id:string = res.id;
      for (var x in modify_edit_question_data){
        if (modify_edit_question_data[x].id == edit_question_id){
          var x:string = modify_edit_question_data.indexOf(modify_edit_question_data[x]);
          modify_edit_question_data.splice(x,x+1, res);
        }
      }
      this.questions = modify_edit_question_data;
      this.questionDataService.questions = modify_edit_question_data;
      console.log(this.questions);

    }, error => {
      console.log(error);
    });
  }

  /*
  Get Questions and set it to the current questions list and as well as to the questionData service
  */
  async getQuestions() {
    this.questionService.getQuestions().subscribe(async res => {
      this.questions = res;
      this.questionDataService.questions = res;
    }, error => {
      console.log(error);
    });
  }

  /*
  In each question clicks it sets all properties of the question to the questionData service
  */
  async questionItemClicked(item) {
    this.questionDataService._id = item.id;
    this.questionDataService._title = item.title;
    this.questionDataService._prompt = item.prompt;
    this.questionDataService._starts_at = item.starts_at;
    this.questionDataService._ends_at = item.ends_at;
    this.questionDataService._sent = item.sent;
    this.questionDataService._has_winner = item.has_winner;

    this.questionDataService._winner_title = item.winner_title;
    this.questionDataService._winner_body = item.winner_body;
    this.questionDataService._loser_title = item.loser_title;
    this.questionDataService._loser_body = item.loser_body;
    this.questionDataService._extra_data = item.extra_data;

    this.questionDataService._answers_1 = item.answer_1;
    this.questionDataService._answers_2 = item.answer_2;
    this.questionDataService._answers_3 = item.answer_3;
    this.questionDataService._answers_4 = item.answer_4;
    this.questionDataService._correct_answer = item.correct_answer;
    this.questionDataService._location = item.location;
    console.log(await this.groupDataService.get_id());
    console.log('question_id'+item.id);
  }

  async updateAccountProperties() {
    this.editAccountData['old_email'] = await this.authDataService.get_email();
    this.authService.updateAccountProperties(this.editAccountData).subscribe(async res => {
      await this.authDataService.set_email(res.email);
      await this.authDataService.set_username(res.username)
      await this.authDataService.set_avatar(environment.BASE_API_URL + String(res.avatar))

      this.image_url = environment.BASE_API_URL + String(res.avatar)

    }, error => {
      console.log(error);
    });
  }

  /*
  Gets the account properties and sets it to the authData service for later use
  */
  async getAccountProperties() {
    this.authService.getAccountProperties().subscribe(async res => {
      await this.authDataService.set_email(res.email);
      await this.authDataService.set_username(res.username);
      await this.authDataService.set_avatar(environment.BASE_API_URL + String(res.avatar))

      this.image_url = environment.BASE_API_URL + String(res.avatar)

    }, error => {
      console.log(error);
    });
  }


  /*
      ===================================Profile Page Functions=====================================
  */


  // Image helper function for choosing the src for images to upload
  async selectImageSource() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: 'Choose From Photos Photo',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];
 
    // Only allow file selection inside a browser
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }
 
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }
 
  // Uses android and ios platforms for uploading profile pictures
  async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 20,
      resultType: CameraResultType.Base64,
      source
    });
    this.image_url = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' 
    + image.base64String);

    const formData = new FormData();
    formData.append('b64', 'data:image/jpeg;base64,'+image.base64String);
    formData.append('old_email',await this.authDataService.get_email());
    
    this.authService.updateProfileImage(formData).subscribe((res) => {
      this.image_url = (environment.BASE_API_URL + String(res.avatar))
      console.log(this.image_url);
    }); 
  }

  // Used for browser direct file upload
  async uploadFile(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar',file);
    formData.append('old_email',await this.authDataService.get_email());
    
    this.authService.updateProfileImage(formData).subscribe((res) => {
      this.image_url = environment.BASE_API_URL + String(res.avatar)
      console.log(this.image_url);
    });
  }

  
}
