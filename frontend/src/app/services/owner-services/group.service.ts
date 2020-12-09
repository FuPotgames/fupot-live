import { environment } from './../../../environments/environment';
import { AuthDataService } from './../auth-services/auth-data.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';


import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  // cache token here to use in your restful calls:
  userToken: string;

  constructor (private http: HttpClient, private storage: Storage, private authDataService:AuthDataService) {
  }

  // Just creates the group in the database
  createGroup(groupData): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/api/fupot/create-group', groupData);
  }

  // Just gets the group properties from the database
  getGroupInfo(): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/api/fupot/create-group','');
  }
}
