import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/*

This Service is reponsibile for getting the current token stored in stoage and
intercepting the request by adding Token XXXX to headers on every request

*/
export class TokenInterceptorService implements HttpInterceptor {
  accountToken: string;
  constructor(private storage: Storage) {
    this.getToken();
  }
  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    return from(this.getToken())
              .pipe(
                switchMap(token => {
                  if (request.headers.get('skip')) {
                    request = request.clone({
                      headers: request.headers.delete('skip')
                  });
                    return next.handle(request);
                  } else{
                    const headers = request.headers
                            .set('Authorization', 'Token ' + token)
                            .append('Content-Type', 'application/json');
                    const requestClone = request.clone({
                     headers 
                    });
                    return next.handle(requestClone);
                  }
                })
               );
    }
  async getToken() {
    const token = await this.storage.get('token');
    return token;
  }

}
