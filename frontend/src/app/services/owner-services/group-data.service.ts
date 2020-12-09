import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupDataService {

  constructor(private storage: Storage) {}

  async get_id(){
    var group_id = this.storage.get('group_id');
    return group_id;
  }
  async get_name(){
    var group_name = this.storage.get('group_name');
    return group_name;
  }
  async get_address(){
    var address = this.storage.get('address');
    return address;
  }
  async get_establishment_type(){
    var establishment_type = this.storage.get('establishment_type');
    return establishment_type;
  }
  async get_email(){
    var token = this.storage.get('group_email');
    return token;
  }
  async get_phone_number(){
    var phone_number = this.storage.get('group_phone_number');
    return phone_number;
  }
  async get_latitude_longitude(){
    var latitude_longitude = this.storage.get('latitude_longitude');
    return latitude_longitude;
  }

  async set_id(group_id){
    await this.storage.set('group_id', group_id);
  }
  async set_name(group_name){
    await this.storage.set('group_name', group_name);
  }
  async set_address(group_address){
    await this.storage.set('address',group_address);
  }
  async set_establishment_type(establishment_type){
    await this.storage.set('establishment_type',establishment_type);
  }
  async set_email(group_email){
    await this.storage.set('group_email',group_email);
  }
  async set_phone_number(group_phone_number){
    await this.storage.set('group_phone_number',group_phone_number);
  }
  async set_latitude_longitude(latitude_longitude){
    await this.storage.set('latitude_longitude',latitude_longitude);
  }
}
