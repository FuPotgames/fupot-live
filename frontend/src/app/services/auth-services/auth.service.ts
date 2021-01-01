import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private http: HttpClient, private csrf:HttpXsrfTokenExtractor) { }

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

  // Responsible for sending password reset email
  forgotPassword(email): Observable<any> {
    var formdata = new FormData();
    formdata.set('email',email);
    formdata.set('csrfmiddlewaretoken',this.csrf.getToken());
    return this.http.post(environment.BASE_API_URL + '/password-reset/',formdata,{withCredentials: true,headers:{'X-XSRF-TOKEN':this.csrf.getToken()}});
  }

  // mock get request for csrf token
  mockForgotPassword(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + '/password-reset/');
  }



}