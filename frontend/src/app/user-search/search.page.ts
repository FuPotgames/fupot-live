import { GeoLocationService } from './../services/general-services/geo-location.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserGroupService } from '../services/user-services/user-group.service';

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
  zoom=9;
  agmFitBounds=true;
  fitBounds=true;
  panning=false;
  establishments = new Array();  // for storing list of dictionaies of establishments

  constructor(private navController: NavController,
    private userGroupService:UserGroupService,
    private geoLocationService:GeoLocationService
    ) { }

  async ngOnInit() {
    await this.searchGroups('');
    
  }

  goLocation() {
    this.navController.navigateRoot('/user-location');
  }

  // gets paginated [5] nearby based on user's current location
  async searchGroups(search_phrases) {
    await this.getLocation();
    this.userGroupService.searchGroups(this.latitude,this.longitude,search_phrases).subscribe(async res => {
    this.establishments=res.results

    for(var i=0; i<this.establishments.length;i++){
        if(this.establishments[i].establishment_type == 'restaurant'){
          this.establishments[i]['icon'] = {
            url: '../../assets/location-icon-blue.svg',
            scaledSize: {
              width: 22,
              height: 22
            }
          };
        }
        if(this.establishments[i].establishment_type == 'shopping'){
          this.establishments[i]['icon'] = {
            url: '../../assets/location-marker-pink.svg',
            scaledSize: {
              width: 22,
              height: 22
            }
          };
        }

        if(this.establishments[i].establishment_type == 'dining'){
          this.establishments[i]['icon'] = {
            url: '../../assets/location-icon-teal.svg',
            scaledSize: {
              width: 22,
              height: 22
            }
          };
        }

        if(this.establishments[i].establishment_type == 'bar'){
          this.establishments[i]['icon'] = {
            url: '../../assets/location-icon-purple.svg',
            scaledSize: {
              width: 22,
              height: 22
            }
          };
        }
      
    }
    
    

    }, error => {
      console.log(error);
    });
  }

  async getLocation() {
    var coordinates = await this.geoLocationService.getLocation();
    this.latitude = coordinates[0]
    this.longitude = coordinates[1]
  }

  async filterList(evt) {
    const searchTerm = evt.srcElement.value;
    //TODO: need to work on loops on paginated search
    
    await this.searchGroups(searchTerm);
    

    var filtered_establishments = this.establishments;
  
    if (!searchTerm) {
      this.panning = false
      this.fitBounds=true
      this.agmFitBounds=true
      await this.getLocation();
      return;
    }
    filtered_establishments = filtered_establishments.filter(establishment => {
      if (establishment.name && searchTerm) {
        this.latitude = establishment['latitude']
        this.longitude = establishment['longitude']
        this.panning = true
        this.fitBounds=false
        this.agmFitBounds=false
        
        return (establishment.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
      else if (establishment.address && searchTerm) {
        this.latitude = establishment['latitude']
        this.longitude = establishment['longitude']
        this.fitBounds=false
        this.agmFitBounds=false
        this.panning = true
        return (establishment.address.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
      else if (establishment.establishment_type && searchTerm) {
        this.latitude = establishment['latitude']
        this.longitude = establishment['longitude']
        this.fitBounds=false
        this.agmFitBounds=false
        this.panning = true
        return (establishment.establishment_type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  test(x){
    console.log(x);
  }



  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


}

