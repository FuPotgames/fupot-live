import { NotificationService } from './../services/general-services/notification.service';
import { UserStatisticsDataService } from './../services/user-services/user-statistics-data.service';
import { UserStatisticsService } from './../services/user-services/user-statistics.service';
import { UserQuestionService } from './../services/user-services/user-question.service';
import { UserGroupService } from './../services/user-services/user-group.service';
import { StatisticsDataService } from './../services/owner-services/statistics-data.service';
import { StatisticsService } from './../services/owner-services/statistics.service';
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
const { Geolocation } = Plugins;

import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import 'moment-timezone';


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
  

  // For group messaging from owners
  messageData: {};
  messages = new Array();
  page = 1;
  maximumPages;

  has_group = true; // group creation helper
  constructor(
    private groupService: GroupService,
    private groupDataService: GroupDataService,
    private questionService:QuestionService,
    private questionDataService:QuestionDataService,

    private authService:AuthService,
    private authDataService:AuthDataService,
    private notificationService:NotificationService,

    private statisticsService:StatisticsService,
    private statisticsDataService:StatisticsDataService,

    private userGroupService:UserGroupService,
    private userQuestionService:UserQuestionService,
    private userStatisticsService:UserStatisticsService,
    private userStatisticsDataService:UserStatisticsDataService,

    private plt: Platform, private actionSheetCtrl: ActionSheetController,private domSanitizer:DomSanitizer
    ) { this.getLocation(); }
  
  async ngOnInit() {
    // Gets and sets the values (we have to make it only for the first time) for creating group purpose
    this.groupData = {
        name: 'fsfsfsfsf',
        address: '324sffsf3 Blvd Rd, Woodbridge, VA 22191',
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

    this.messageData = {
      title:'New Promotions!!',
      body:'Come try our new Dessert!!',
      extra_data:'none'
    }
    


    await this.createGroup();
    this.group_id = await this.groupDataService.get_id();
    await this.getQuestions();

    await this.getAccountProperties();
    
    await this.resendConfirmEmail(await this.authDataService.get_email());

    //await this.sendGroupMessages(this.group_id,this.messageData);

    //await this.getGroupMessages();


    /* await this.getOwnerStatistics();
    var question_asked = await this.statisticsDataService.get_question_asked();
    var prizes_issued = await this.statisticsDataService.get_prizes_issued();

    await this.updateOwnerStatistics(8372,{prizes_issued: '1'}) // or question_asked */


    // await this.searchGroups(coordinates.coords.latitude,coordinates.coords.longitude,'');

    // await this.getJoinedGroups(coordinates.coords.latitude,coordinates.coords.longitude);

    // await this.joinGroup(4);
    // await this.getGroupQuestions(5);
    
    // var questionData = {
    //   answer: 'Cheetah',
    //   group: 1,
    //   question: 1,
    //   lat: 38.64369309163591,
    //   long: -77.29555836068978
    // }
    // await this.answerQuestion(questionData);
    // await this.getAnsweredResponses(5);

    // await this.createUserStatistics();
    // await this.updateUserStatistics({
    //   "questions_answered": '2'
    // })

    await this.getOwnerStatistics();

    //await this.getResultStatus();
    await this.deleteResultStatus(1);


  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.groupData['latitude'] = position.coords.latitude
    this.groupData['longitude'] = position.coords.longitude
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
  async questionItemClicked(item,question) {
    this.questionDataService._id = question.id;
    this.questionDataService._title = question.title;
    this.questionDataService._prompt = question.prompt;
    this.questionDataService._starts_at = question.starts_at;
    this.questionDataService._ends_at = question.ends_at;
    this.questionDataService._sent = question.sent;
    this.questionDataService._has_winner = question.has_winner;

    this.questionDataService._winner_title = question.winner_title;
    this.questionDataService._winner_body = question.winner_body;
    this.questionDataService._loser_title = question.loser_title;
    this.questionDataService._loser_body = question.loser_body;
    this.questionDataService._extra_data = question.extra_data;

    this.questionDataService._answers_1 = question.answer_1;
    this.questionDataService._answers_2 = question.answer_2;
    this.questionDataService._answers_3 = question.answer_3;
    this.questionDataService._answers_4 = question.answer_4;
    this.questionDataService._correct_answer = question.correct_answer;
    this.questionDataService._location = question.location;
    console.log(await this.groupDataService.get_id());
    console.log('question_id'+question.id);
    console.log(this.groupData);

  }
  /*
    Updates account username and email if the owner/user wants to
  */
  async updateAccountProperties() {
    this.editAccountData['old_email'] = await this.authDataService.get_email();
    this.authService.updateAccountProperties(this.editAccountData).subscribe(async res => {
      await this.authDataService.set_email(res.email);
      await this.authDataService.set_username(res.username)
      //await this.authDataService.set_avatar(environment.BASE_API_URL + String(res.avatar))

      //this.image_url = environment.BASE_API_URL + String(res.avatar)

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
      await this.authDataService.set_is_verified(res.is_verified);

      if (res.avatar != null){
        //download image as base64 and store it
        this.convertToDataURLviaCanvas(environment.BASE_API_URL + String(res.avatar), "image/jpeg").then(async base64 => {
          await this.authDataService.set_avatar(base64);
          var old = await this.authDataService.get_avatar();
          this.image_url = this.domSanitizer.bypassSecurityTrustUrl(String(old));       
        });
      }


    }, error => {
      console.log(error);
    });
  }
  
  /* After registration or login, the user/owner would be presented with a page saying verify email address,
  if they didn't receive their email verfication link, they could ask for resend another one */
  async resendConfirmEmail(email) {
    this.authService.resendConfirmEmail(email).subscribe(async res => {
      console.log(res);

    }, error => {
      console.log(error);
    });
  }

  // Checks the question and notify the winners and losers
  async checkQuestion() {
    this.questionService.checkQuestion(await this.groupDataService.get_id(),this.questionDataService.id).subscribe(async res => {
      console.log(res);

    }, error => {
      console.log('Something went wrong');
    });
  }

  // Sends the group message to specific group by group id
  async sendGroupMessages(group_id,messageData) {
    this.notificationService.sendGroupMessages(group_id,messageData).subscribe(async res => {
      console.log(res);

    }, error => {
      console.log('Something went wrong');
    });
  }

  // Gets the group messages
  async getGroupMessages(infiniteScroll?) {
    this.notificationService.getGroupMessages(this.group_id,this.page).subscribe(async res => {

        for(var x in res){
          var zone_name =  moment.tz.guess();
          var utcDate = res[x].created_at;  // ISO-8601 formatted date returned from server
          var localDate = new Date(utcDate);
          res[x].created_at = localDate.toLocaleString('en-US', { timeZone: zone_name })
          this.messages.push(res[x]);
        }
        if (infiniteScroll) {
          infiniteScroll.target.complete();
          infiniteScroll.target.disabled = true;
        }
      
    }, error => {
        infiniteScroll.target.disabled = true;
    });
  }

  // Infinite list for group messages
  loadMore(infiniteScroll) {
    this.page++;
    this.getGroupMessages(infiniteScroll);
  }




  /*
      ===================================Profile Page Functions=====================================
  */
  // Helps to convert image url to base54 encoded string
  convertToDataURLviaCanvas(url, outputFormat){
    return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      let canvas = <HTMLCanvasElement> document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        dataURL;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      resolve(dataURL);
      canvas = null;
    };
    img.src = url;
  });
  }


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
    

    const formData = new FormData();
    formData.append('b64', 'data:image/jpeg;base64,'+image.base64String);
    formData.append('old_email',await this.authDataService.get_email());
    
    this.authService.updateProfileImage(formData).subscribe(async (res) => {
      await this.authDataService.set_avatar('data:image/jpeg;base64,' + image.base64String);
      var old = await this.authDataService.get_avatar();
      this.image_url = this.domSanitizer.bypassSecurityTrustUrl(String(old)); 
      
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



  //========================================= Owner Statistics=================================

  // creates the statistics record for the owner,
  // Should one call the individual register
  async createOwnerStatistics() {
    this.statisticsService.createOwnerStatistics().subscribe(async res => {
      await this.statisticsDataService.set_question_asked(res.question_asked);
      await this.statisticsDataService.set_prizes_issued(res.prizes_issued);
      await this.statisticsDataService.set_group_members('0');

    }, error => {
      console.log('Something went wrong');
    });
  }

  // Updates the OwnerStatistics with group_id and the data
  async updateOwnerStatistics(group_id,updateStatisticsData) {
    this.statisticsService.updateOwnerStatistics(group_id,updateStatisticsData).subscribe(async res => {
      await this.statisticsDataService.set_question_asked(res.question_asked);
      await this.statisticsDataService.set_prizes_issued(res.prizes_issued);
      await this.statisticsDataService.set_group_members(res.group_members);

    }, error => {
      console.log('Something went wrong');
    });
  }

  // gets the latest statistics for the owner
  async getOwnerStatistics() {
    this.statisticsService.getsOwnerStatistics().subscribe(async res => {
      await this.statisticsDataService.set_question_asked(res[0].question_asked);
      await this.statisticsDataService.set_prizes_issued(res[0].prizes_issued);
      await this.statisticsDataService.set_group_members(res[0].group_members);
    }, error => {
      console.log('Something went wrong');
    });
  }

  //========================================= User Statistics=================================

  // creates the statistics record for the owner,
  // Should one call the individual register
  async createUserStatistics() {
    this.userStatisticsService.createUserStatistics().subscribe(async res => {
      await this.userStatisticsDataService.set_groups_joined(res.groups_joined);
      await this.userStatisticsDataService.set_prizes_won(res.prizes_won);
      await this.userStatisticsDataService.set_questions_answered(res.questions_answered);
    }, error => {
      console.log('Something went wrong');
    });
  }

  // Updates the OwnerStatistics with group_id and the data
  async updateUserStatistics(updateStatisticsData) {
    this.userStatisticsService.updateUserStatistics(updateStatisticsData).subscribe(async res => {
      await this.userStatisticsDataService.set_groups_joined(res.groups_joined);
      await this.userStatisticsDataService.set_prizes_won(res.prizes_won);
      await this.userStatisticsDataService.set_questions_answered(res.questions_answered);
    }, error => {
      console.log('Something went wrong');
    });
  }

  // gets the latest statistics for the owner
  async getUserStatistics() {
    this.userStatisticsService.getsUserStatistics().subscribe(async res => {
      await this.userStatisticsDataService.set_groups_joined(res[0].groups_joined);
      await this.userStatisticsDataService.set_prizes_won(res[0].prizes_won);
      await this.userStatisticsDataService.set_questions_answered(res[0].questions_answered);
    }, error => {
      console.log('Something went wrong');
    });
  }


  //============================================= User Section ====================================

  // gets paginated [5] nearby based on user's current location
  async searchGroups(lat,long,search_phrases?) {
    this.userGroupService.searchGroups(lat,long,search_phrases).subscribe(async res => {
      console.log(res.results);

    }, error => {
      console.log('Group Search Failed');
    });
  }

  // join a group by group_id
  async joinGroup(group_id) {
    this.userGroupService.joinGroup(group_id).subscribe(async res => {
      console.log(res);

    }, error => {
      console.log('Can\'t join a group');
    });
  }

  // gets paginated [4] joined groups sorts from closest to farthest
  async getJoinedGroups(lat,long) {
    this.userGroupService.getJoinedGroups(lat,long).subscribe(async res => {
      console.log(res);

    }, error => {
      console.log('Something went wrong with getting joined groups');
    });
  }

  // gets the groups questions specified by the group_id
  async getGroupQuestions(group_id) {
    this.userQuestionService.getGroupQuestions(group_id).subscribe(async res => {
      console.log(res);

    }, error => {
      console.log('Something went wrong with getting getting group questions');
    });
  }

  // answer the specific question inside a group by question id and related parameters
  async answerQuestion(answerData) {
    this.userQuestionService.answerQuestion(answerData).subscribe(async res => {
      console.log(res);

    }, error => {
      console.log('Something went wrong with answering that question');
    });
  }

  // gets all the answers that the user has submitted for that specific group
  async getAnsweredResponses(group_id) {
    this.userQuestionService.answeredResponses(group_id).subscribe(async res => {
      console.log(res);

    }, error => {
      console.log('Something went wrong with getting answered responses');
    });
  }


  // gets all the result notification status of whether the user got the answer correct or not
  async getResultStatus() {
    this.userQuestionService.getResultStatus().subscribe(async res => {
      console.log(res);

    }, error => {
      console.log('Something went wrong with getting result status');
    });
  }

  // delete the specific result notification status by the id
  async deleteResultStatus(result_status_id) {
    this.userQuestionService.deleteResultStatus(result_status_id).subscribe(async res => {
      console.log(res);

    }, error => {
      console.log('Something went wrong with deleting result status');
    });
  }
  

  
}
