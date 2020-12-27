import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStatisticsService {

  constructor(private http: HttpClient) { }

  // Should get initialized in the database when the user/owner register for the first time
  createUserStatistics(): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/api/fupot/create-user-statistics','');
  }

  // Updates the user statistics
  updateUserStatistics(updateStatisticsData): Observable<any> {
    return this.http.patch(environment.BASE_API_URL + '/api/fupot/update-user-statistics',updateStatisticsData);
  }

  // Gets the user statistics
  getsUserStatistics(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + '/api/fupot/get-user-statistics');
  }
}
