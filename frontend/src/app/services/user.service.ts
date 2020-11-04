import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Register Service: Responsibile for creating user accounts
  register(userData): Observable<any> {
    return this.http.post('http://192.168.1.221:8000/api/account/register', userData);
  }
  // Login Service: Responsibile for logging user accounts
  login(userData): Observable<any> {
    return this.http.post('http://192.168.1.221:8000/api/account/login', userData);
  }
}
