import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { Plugins,PermissionType } from '@capacitor/core';
const { Geolocation } = Plugins;
const { Permissions } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor(private storage:Storage) { }

  async setLocation() {
    const position = await Geolocation.getCurrentPosition();
    await this.storage.set('lat', position.coords.latitude);
    await this.storage.set('lon', position.coords.longitude); 
    }


  async getLocation(){
    var lat = await this.storage.get('lat');
    var lon = await this.storage.get('lon');
    return [lat,lon];
  }
}
