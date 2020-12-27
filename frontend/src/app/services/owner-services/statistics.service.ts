import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }


  // Should get initialized in the database when the user/owner register for the first time
  createOwnerStatistics(): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/api/fupot/create-owner-statistics','');
  }

  // Updates the owner statistics
  updateOwnerStatistics(group_id,updateStatisticsData): Observable<any> {
    return this.http.patch(environment.BASE_API_URL + '/api/fupot/update-owner-statistics/'+group_id,updateStatisticsData);
  }

  // Gets the owner statistics
  getsOwnerStatistics(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + '/api/fupot/get-owner-statistics');
  }
}
