import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private http: HttpClient) { }

  // Responsible for creating user accounts
  register(userData): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/api/account/register', userData, {headers:{skip:"true"}});
  }
  // Responsible for logging user accounts
  login(userData): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/api/account/login', userData, {headers:{skip:"true"}});
  }
  // Responsible for updating user account properties such as email and username
  updateAccountProperties(editData): Observable<any> {
    return this.http.patch(environment.BASE_API_URL + '/api/account/account-update', editData);
  }
  // Responsible for get account properties such as email,username and profile pic link
  getAccountProperties(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + '/api/account/account-properties');
  }
  // Responsible for updating profile pic
  updateProfileImage(formData: FormData): Observable<any> {
    return this.http.patch(environment.BASE_API_URL + '/api/account/account-update', formData);
  }

  // Responsible for resending confirmation link for the user/owner to click to activate their account
  resendConfirmEmail(email): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/resend-confirm_email/',{email:email});
  }

}