import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/owner-services/group.service';
import { GroupDataService } from '../services/owner-services/group-data.service';

import { Plugins} from '@capacitor/core';
import { NavController } from '@ionic/angular';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-owner-signup',
  templateUrl: './group-creation.page.html',
  styleUrls: ['./group-creation.page.scss'],
})
export class GroupCreation implements OnInit {
  groupData: {};  // for creating group purposes
  group_id:string; // for retrieving the id from the groupData service
  has_group = true; // group creation helper
  establishment_type:string;
  constructor(
    private groupService: GroupService,
    private groupDataService: GroupDataService,
    private navController: NavController
    ) { }

  async ngOnInit() {
    // Gets and sets the values (we have to make it only for the first time) for creating group purpose
    this.groupData = {
      name: '',
      address: '',
      establishment_type: '',
      latitude: '',
      longitude: ''
    };

    var id = await this.groupDataService.get_id()
    if(id != null){
      // redirecting our user after signup
      this.navController.navigateRoot('/owner-tabs');
    }
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
  if(this.establishment_type != undefined){
    await this.getLocation();
  this.groupService.createGroup(groupData).subscribe(async res => {
    try{
      if (res['1']['reponse'] == 'Group already exists with this owner'){
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
      this.has_group = false
      if (this.has_group == false){
        this.createGroup(this.groupData);
        this.has_group = true;
        // redirecting our user after signup
        this.navController.navigateRoot('/owner-tabs');
      }
    }
    
  }, error => {
    console.log(error);
  });
  }
  else{
    alert('Please choose a category type')
  }
  
  }
  onChange($event){
    this.establishment_type =  event['detail'].value;
    this.groupData['establishment_type'] = this.establishment_type
  }


}
