import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserGroupService } from '../services/user-services/user-group.service';

import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import {trigger, transition, style, animate, query, stagger, animateChild} from '@angular/animations';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [style({opacity: 0}), animate('.6s ease')])
    ]),
    trigger('stagger', [
      transition(':enter', [
        query(':enter', stagger('30s', [animateChild()]))
      ])
    ])]
    })
  
export class SearchPage implements OnInit {
  latitude: string;
  longitude: string;
  establishments = new Array();  // for storing list of dictionaies of establishments

  constructor(private navController: NavController,
    private userGroupService:UserGroupService
    ) { }

  async ngOnInit() {
    await this.searchGroups('');
    console.log(this.latitude)
  }

  goLocation() {
    this.navController.navigateRoot('/user-location');
  }

  // gets paginated [5] nearby based on user's current location
  async searchGroups(search_phrases) {
    await this.getLocation();
    this.userGroupService.searchGroups(this.latitude,this.longitude,search_phrases).subscribe(async res => {
    
    this.establishments=res.results
    
    console.log(this.establishments);
    
    

    }, error => {
      console.log(error);
    });
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = String(position.coords.latitude)
    this.longitude = String(position.coords.longitude)
  }

  async filterList(evt) {
    const searchTerm = evt.srcElement.value;
    await this.searchGroups(searchTerm);

    var filtered_establishments = this.establishments;
  
    if (!searchTerm) {
      return;
    }
    filtered_establishments = filtered_establishments.filter(establishment => {
      if (establishment.name && searchTerm) {
        return (establishment.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
      else if (establishment.address && searchTerm) {
        return (establishment.address.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
      else if (establishment.establishment_type && searchTerm) {
        return (establishment.establishment_type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }


}

export class RefresherExample {
  constructor() {}

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
