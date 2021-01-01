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
  async get_is_verified(){
    var is_verified = this.storage.get('is_verified');
    return is_verified;
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
  async set_is_verified(is_verified){
    await this.storage.set('is_verified',is_verified);
  }
  
  async clear_token(){
    await this.storage.clear();
  }

  async set_user_type(user_type){
    await this.storage.set('user_type', user_type);
  }
  async get_user_type(){
    var user_type = this.storage.get('user_type');
    return user_type;
  }


}
