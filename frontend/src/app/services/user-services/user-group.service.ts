import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(private http: HttpClient) { }

  // sends a get request depending on what kind of arguments pass, it will search nearby groups
  searchGroups(lat,long,search_phrases,paginated_index,establishment_type?): Observable<any> {
    if((paginated_index != null)){
      return this.http.get(environment.BASE_API_URL + '/api/fupot/search-groups'+'?lat='+lat+'&long='+long+'&search='+establishment_type+'&page='+paginated_index);
    }
    else if ((search_phrases != undefined) || (search_phrases != '')){
      console.log("search")
        return this.http.get(environment.BASE_API_URL + '/api/fupot/search-groups?lat='+lat+'&long='+long+'&search='+search_phrases);
      
    }
    else{
      return this.http.get(environment.BASE_API_URL + '/api/fupot/search-groups'+'?lat='+lat+'&long='+long);
    }
  }

  // sends a post request to join a group
  joinGroup(group_id): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/api/fupot/join-group',{group_id:group_id});
  }

  // sends a get request to get all the joined groups
  getJoinedGroups(lat,long): Observable<any> {
    return this.http.get(environment.BASE_API_URL + '/api/fupot/get-joined-groups?lat='+lat+'&long='+long);
  }

}
