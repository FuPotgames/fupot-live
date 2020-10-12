import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
/*
  This service class is responsibile for storing and retriving user data
*/
export class UserAuthService {

  private _username: string;
  private _email: string;
  private _phone: string;
  private _token: string;

  constructor() {

  }
  set username(username){
    this._username = username;
  }
  set email(email){
    this._email = email;
  }
  set phone(phone){
    this._phone = phone;
  }
  set token(token){
    this._token = token;
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  get username(): string {
    return this._username;
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  get email(): string {
    return this._email;
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  get phone(): string {
    return this._phone;
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  get token(): string {
    return this._token;
  }
}
