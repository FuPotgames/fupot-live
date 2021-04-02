import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionDataService {
  _questions:any;
  _id:'';
  _title:'';
  _prompt: '';
  _starts_at: '';
  _ends_at: '';
  _sent:true;
  _has_winner:boolean;
  _winner_title: '';
  _loser_title: '';
  _winner_body: '';
  _loser_body: '';
  _extra_data: '';
  _answers_1: '';
  _answers_2: '';
  _answers_3: '';
  _answers_4: '';
  _correct_answer: '';
  _location: '';

  _question_index:any;
  _question_delete_status;
  
  constructor() { }

  set question_delete_status(status){
    this._question_delete_status = status;
  }
  set question_index(index){
    this._question_index = index;
  }
  set questions(question){
    this._questions = question;
  }
  set id(id){
    this._id = id;
  }
  set title(title){
    this._title = title;
  }
  set prompt(prompt){
    this._prompt = prompt;
  }
  set starts_at(starts_at){
    this._starts_at = starts_at;
  }
  set ends_at(ends_at){
    this._ends_at = ends_at;
  }
  set has_winner(has_winner){
    this._has_winner = has_winner;
  }
  set winner_title(winner_title){
    this._winner_title = winner_title;
  }
  set loser_title(loser_title){
    this._loser_title = loser_title;
  }
  set winner_body(winner_body){
    this._winner_body = winner_body;
  }
  set loser_body(loser_body){
    this._loser_body = loser_body;
  }
  set extra_data(extra_data){
    this._extra_data = extra_data;
  }
  set answer_1(answer_1){
    this._answers_1 = answer_1;
  }
  set answer_2(answer_2){
    this._answers_2 = answer_2;
  }
  set answer_3(answer_3){
    this._answers_3 = answer_3;
  }
  set answer_4(answer_4){
    this._answers_4 = answer_4;
  }
  set correct_answer(correct_answer){
    this._correct_answer = correct_answer;
  }
  set location(location){
    this._location = location;
  }


  get question_delete_status(){
    return this._question_delete_status;
  }
  get question_index(){
    return this._question_index;
  }
  get questions(){
    return this._questions;
  }
  get id(){
    return this._id;
  }
  get title(){
    return this._title;
  }

  get prompt(){
    return this._prompt;
  }
  get starts_at(){
    return this._starts_at;
  }
  get ends_at(){
    return this._ends_at;
  }
  get has_winner(){
    return this._has_winner;
  }
  get winner_title(){
    return this._winner_title;
  }
  get loser_title(){
    return this._loser_title;
  }
  get winner_body(){
    return this._winner_body;
  }
  get loser_body(){
    return this._loser_body;
  }
  get extra_data(){
    return this._extra_data;
  }
  get answer_1(){
    return this._answers_1;
  }
  get answer_2(){
    return this._answers_2;
  }
  get answer_3(){
    return this._answers_3;
  }
  get answer_4(){
    return this._answers_4;
  }
  get correct_answer(){
    return this._correct_answer;
  }
  get location(){
    return this._location;
  }

  
}
