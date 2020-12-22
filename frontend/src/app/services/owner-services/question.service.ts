import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthDataService } from '../auth-services/auth-data.service';
import { Observable, interval } from 'rxjs';
import { environment } from './../../../environments/environment';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient,private authDataService:AuthDataService) { }

  // Send a post request to create the question in the database
  createQuestion(group_id,questionData): Observable<any> {
    questionData['group'] = group_id
    return this.http.post(environment.BASE_API_URL + '/api/fupot/create-question',questionData);
  }

   // Send a get request to the latest questions from the database
   getQuestions(): Observable<any> {
    return interval(1000).pipe(flatMap( () => this.http.get(environment.BASE_API_URL + '/api/fupot/get-owner-questions')));
  }

   // Send a patch request to edit the question in the database
   editQuestion(question_id,questionData): Observable<any> {
    return this.http.patch(environment.BASE_API_URL + '/api/fupot/edit-question/'+question_id,questionData);
  }
}
