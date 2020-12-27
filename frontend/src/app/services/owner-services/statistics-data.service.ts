import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsDataService {

  constructor(private storage:Storage) { }

  async get_question_asked(){
    var question_asked = this.storage.get('question_asked');
    return question_asked;
  }
  async get_prizes_issued(){
    var prizes_issued = this.storage.get('prizes_issued');
    return prizes_issued;
  }
  async get_group_members(){
    var group_members = this.storage.get('group_members');
    return group_members;
  }

  async set_question_asked(question_asked){
    await this.storage.set('question_asked', question_asked);
  }
  async set_prizes_issued(prizes_issued){
    await this.storage.set('prizes_issued', prizes_issued);
  }
  async set_group_members(group_members){
    await this.storage.set('group_members', group_members);
  }
}
