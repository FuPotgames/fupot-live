import { AuthDataService } from './../services/auth-services/auth-data.service';
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
  user_id:string;
  latitude: string;
  longitude: string;
  zoom=13.5;
  establishments = new Array();  // for storing list of dictionaies of establishments
  only_establishments = new Array();  // for storing list of dictionaies of establishments
  search_term;

  usePanning=true
  panControl=true
  fitBounds=true
  agmFitBounds=true
  
  constructor(private navController: NavController,
    private userGroupService:UserGroupService,
    private geoLocationService:GeoLocationService,
    private authDataService:AuthDataService
    ) { this.zoom = 13.6;}

  async ngOnInit() {
    
  }
  async ionViewWillEnter(){
    await this.searchGroups('');
  }

  async get_joined_groups(establishment){
    this.user_id = await this.authDataService.get_user_id()
    this.userGroupService.getJoinedGroups(this.latitude,this.longitude).subscribe(res =>{
    
    var matched =false
      for(var x in res.results){
        for(var y in res.results[x].user){
          if((String(this.user_id) == String(res.results[x].user[y])) &&  String(res.results[x].name) == (String(establishment.name))){
            matched = true;
            break;
          }
        }
      }
      if(matched){
        this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'name':establishment.name,'is_joined':matched}});
      }
      else {
        this.navController.navigateRoot('/user-location',{'queryParams': {'group_id':establishment.id,'name':establishment.name,'is_joined':matched}});
      }
    });
  }

  async goLocation(establishment) {
    await this.get_joined_groups(establishment);
  }

  // gets paginated [5] nearby based on user's current location
  async searchGroups(search_phrases) {
    await this.getLocation();
    this.userGroupService.searchGroups(this.latitude,this.longitude,search_phrases,null).subscribe(async res => {
    this.establishments=res.results

    this.establishments.push({
      establishment_type:'',
      address:'',
      name:'my location',
      latitude: this.latitude,
      longitude: this.longitude,
    });

    for(var i=0; i<this.establishments.length;i++){
        if(this.establishments[i].establishment_type == 'restaurant'){
          this.establishments[i]['icon'] = {
            url: '../../assets/location-icon-blue.svg',
            scaledSize: {
              width: 22,
              height: 22
            },
            label: {
              color: '#ffffff',
              fontWeight: 'bold',
              text: this.establishments[i]['name'],
            }
          };
        }
        if(this.establishments[i].name == 'my location'){
          this.establishments[i]['icon'] = {
            url: '../../assets/location-icon-teal.svg',
            scaledSize: {
              width: 22,
              height: 22
            },
            label: {
              color: '#ffffff',
              fontWeight: 'bold',
              text: this.establishments[i]['name'],
            }
          };
        }
        if(this.establishments[i].establishment_type == 'shopping'){
          this.establishments[i]['icon'] = {
            url: '../../assets/location-marker-pink.svg',
            scaledSize: {
              width: 22,
              height: 22
            },
            label: {
              color: '#ffffff',
              fontWeight: 'bold',
              text: this.establishments[i]['name'],
            }
          };
        }

        if(this.establishments[i].establishment_type == 'entertainment'){
          this.establishments[i]['icon'] = {
            url: '../../assets/location-icon-teal.svg',
            scaledSize: {
              width: 22,
              height: 22
            },
            label: {
              color: '#ffffff',
              fontWeight: 'bold',
              text: this.establishments[i]['name'],
            }
          };
        }

        if(this.establishments[i].establishment_type == 'social'){
          this.establishments[i]['icon'] = {
            url: '../../assets/location-icon-purple.svg',
            scaledSize: {
              width: 22,
              height: 22
            },
            label: {
              text: this.establishments[i]['name'],
              color: '#ffffff',
              fontWeight: 'bold',
            }
          };
        }

      
    }
    this.only_establishments=[]
    for(var i=0;i<this.establishments.length-1;i++){
      this.only_establishments.push(this.establishments[i]);
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
    this.search_term = evt.srcElement.value;
    
    await this.searchGroups(this.search_term);
    

    var filtered_establishments = this.establishments;
  
    if (!this.search_term) {
      
      this.agmFitBounds = false
      this.fitBounds = false
      this.panControl = false
      this.usePanning = false
      await this.getLocation();
      this.agmFitBounds = true
      this.fitBounds = true
      this.panControl = true
      this.usePanning = true
      this.zoom=13.5
      return;
    }
    filtered_establishments = filtered_establishments.filter(establishment => {
      if (String(this.search_term).search(String(establishment.name))) {
        this.agmFitBounds = false
        this.fitBounds = false
        this.panControl = false
        this.usePanning = false
        
        this.agmFitBounds = true
        this.fitBounds = true
        this.panControl = true
        this.usePanning = true
        this.zoom=8
        return (establishment.name.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1);
      }
      if (String(this.search_term).search(String(establishment.address))) {
        this.agmFitBounds = false
        this.fitBounds = false
        this.panControl = false
        this.usePanning = false
        
        this.agmFitBounds = true
        this.fitBounds = true
        this.panControl = true
        this.usePanning = true
        this.zoom=8
        return (establishment.address.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1);
      }
      if (establishment.establishment_type && this.search_term) {
        this.agmFitBounds = false
        this.fitBounds = false
        this.panControl = false
        this.usePanning = false
        
        this.agmFitBounds = true
        this.fitBounds = true
        this.panControl = true
        this.usePanning = true
        this.zoom=8
        return (establishment.establishment_type.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1);
      }
      
    });
    try{
      if (filtered_establishments[0]['latitude'] != undefined){
      setTimeout(()=>{
        this.latitude = filtered_establishments[0]['latitude']
        this.longitude = filtered_establishments[0]['longitude']
      },500)
      }
    }
    catch{
      
    }
    
    
  }


  async doRefresh(event) {
    console.log('Begin async operation');
    document.querySelector('ion-searchbar').getInputElement().then((searchInput) => {
      searchInput.value = '';
      searchInput.blur()
    });
    await this.searchGroups('');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  completeRefresh(event) {
    event.target.disabled = true;
    event.target.complete();
    setTimeout(() => {
      event.target.disabled = false;
    }, 2000);
  }
}

