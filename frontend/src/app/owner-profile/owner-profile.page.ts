import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/owner-services/group.service';
import { GroupDataService } from '../services/owner-services/group-data.service';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.page.html',
  styleUrls: ['./owner-profile.page.scss'],
})
export class OwnerProfilePage implements OnInit {

  showMe: boolean;
  group_id;
  editData;
  constructor(
    private groupService: GroupService,
    private groupDataService: GroupDataService,
  ) { }

  async ngOnInit() {
    this.group_id = await this.groupDataService.get_id();
    this.editData = {
      name: '',
      address: '',
      phone_number: ''
    };
  }

  show() {
    this.showMe = !this.showMe;
  }

  test(){
    console.log(this.editData);
    for(var x in this.editData){
      console.log(this.editData[x]);
    }
  }


/*
Edit the Group and saves the group properties in the groupData service and return a json response
Also, if the group already exists, it just gets the group properties and sets it to groupData service
as well
*/
async editGroup(group_id,editData) {
  this.groupService.editGroup(group_id,editData).subscribe(async res => {
    await this.groupDataService.set_name(res.name);
    await this.groupDataService.set_address(res.address);
    await this.groupDataService.set_establishment_type(res.establishment_type);
    await this.groupDataService.set_phone_number(res.phone_number);
    await this.groupDataService.set_latitude_longitude(res.latitude + ',' + res.longitude);

  }, error => {
    console.log(error);
  });
}

}
