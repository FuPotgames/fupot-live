import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserQuestionService {

  constructor(private http: HttpClient) { }

  // sends a get request to get all the questions from that specific group by group_id
  getGroupQuestions(group_id): Observable<any> {
    return this.http.get(environment.BASE_API_URL + '/api/fupot/get-user-questions?group='+group_id);
  }

  // sends a post request and returns whether the user is allowed to answer the questions and continues..
  // or it just says the user has to be near that specific establishment
  answerQuestion(answerData): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/api/fupot/answer-question',answerData);
  }

  //sends a get request to get answers for the list of questions in that specific group 
  answeredResponses(group_id): Observable<any> {
    return this.http.get(environment.BASE_API_URL + '/api/fupot/get-user-submissions?group='+group_id);
  }

  //sends a get request to retrive all the result status if the user got the correct answer or not
  getResultStatus(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + '/api/fupot/get-result-status');
  }

  //sends a delete request if the user wants to delete the notification status
  deleteResultStatus(result_status_id): Observable<any> {
    return this.http.delete(environment.BASE_API_URL + '/api/fupot/remove-status/'+result_status_id);
  }

  //sends a get request to retrive current timestamp in UTC
  getTimestamp(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + '/api/fupot/get-current-timestamp');
  }

}
