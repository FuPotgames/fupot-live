import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountCreationService{

  constructor(private http: HttpClient) { }

  // Register Service: Responsibile for creating user accounts
  register(userData): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/api/account/register', userData, {headers:{skip:"true"}});
  }
  // Login Service: Responsibile for logging user accounts
  login(userData): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/api/account/login', userData, {headers:{skip:"true"}});
  }
}