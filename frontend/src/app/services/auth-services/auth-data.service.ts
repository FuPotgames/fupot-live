import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
/*
  This service class is responsibile for storing and retriving user data
*/
export class AuthDataService {

  constructor (private storage: Storage) {}

  async get_username(){
    var username = this.storage.get('username');
    return username;
  }
  async get_email(){
    var email = this.storage.get('email');
    return email;
  }
  async get_avatar(){
    var avatar = this.storage.get('avatar');
    return avatar;
  }
  async get_phone(){
    var phone = this.storage.get('phone');
    return phone;
  }
  async get_token(){
    var token = this.storage.get('token');
    return token;
  }

  async set_username(username){
    await this.storage.set('username',username);
  }
  async set_email(email){
    await this.storage.set('email',email);
  }
  async set_avatar(avatar){
    await this.storage.set('avatar',avatar);
  }
  async set_phone(phone){
    await this.storage.set('phone',phone);
  }
  async set_token(token){
    await this.storage.set('token',token);
  }
  
  async clear_token(){
    await this.storage.clear();
  }


}
