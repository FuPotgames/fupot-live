import { environment } from './../../../environments/environment';
import { AuthDataService } from './../auth-services/auth-data.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  // cache token here to use in your restful calls:
  userToken: string;

  constructor (private http: HttpClient,private authDataService:AuthDataService) {
  }

  /* Send a post request to create the group if it doesn't exist or 
     just get the grouo info if it already exists from the database */
  createGroup(groupData): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/api/fupot/create-group', groupData);
  }

  // Send a patch request to edit the question in the database
  editGroup(group_id,groupData): Observable<any> {
    return this.http.patch(environment.BASE_API_URL + '/api/fupot/edit-group/'+group_id,groupData);
  }
}
