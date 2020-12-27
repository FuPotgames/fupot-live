import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStatisticsDataService {

  constructor(private storage:Storage) { }

  async get_questions_answered(){
    var questions_answered = this.storage.get('questions_answered');
    return questions_answered;
  }
  async get_groups_joined(){
    var groups_joined = this.storage.get('groups_joined');
    return groups_joined;
  }
  async get_prizes_won(){
    var prizes_won = this.storage.get('prizes_won');
    return prizes_won;
  }

  async set_questions_answered(questions_answered){
    await this.storage.set('questions_answered', questions_answered);
  }
  async set_groups_joined(groups_joined){
    await this.storage.set('groups_joined', groups_joined);
  }
  async set_prizes_won(prizes_won){
    await this.storage.set('prizes_won', prizes_won);
  }
}
