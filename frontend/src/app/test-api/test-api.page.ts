import { GroupDataService } from './../services/owner-services/group-data.service';
import { Storage } from '@ionic/storage';
import { AuthDataService } from './../services/auth-services/auth-data.service';
import { GroupService } from './../services/owner-services/group.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.page.html',
  styleUrls: ['./test-api.page.scss']
})
export class TestApiPage implements OnInit {
  groupData: {};
  constructor(private groupService: GroupService, private groupDataService: GroupDataService, private authDataService: AuthDataService, private storage: Storage) { }

  async ngOnInit() {
    this.groupData = {
       name: 'Subway',
        address: '1266 Blvd Rd, Woodbridge, VA 22191',
        establishment_type: 'restaurant',
        latitude: 38.6414608275342,
        longitude: -77.3016720201729
    };

  }
  async createGroup(groupData) {
    this.groupService.createGroup(groupData).subscribe(async res => {
      await this.groupDataService.set_id(res.id);
      await this.groupDataService.set_name(res.name);
      await this.groupDataService.set_address(res.address);
      await this.groupDataService.set_establishment_type(res.establishment_type);
      await this.groupDataService.set_phone_number(res.phone_number);
      await this.groupDataService.set_latitude_longitude(res.latitude + ',' + res.longitude);

    }, error => {
      console.log(error);
    });
  }
  async getGroupInfo() {
    this.groupService.getGroupInfo().subscribe(async res => {
      await this.groupDataService.set_id(res[0].pk);
      await this.groupDataService.set_name(res[0].fields.name);
      await this.groupDataService.set_address(res[0].fields.address);
      await this.groupDataService.set_establishment_type(res[0].fields.establishment_type);
      await this.groupDataService.set_phone_number(res[0].fields.phone_number);
      await this.groupDataService.set_latitude_longitude(res[0].fields.latitude + ',' + res[0].fields.longitude);

    }, error => {
      console.log(error);
    });
  }

}
