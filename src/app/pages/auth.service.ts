import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  url = 'https://api-legal.herokuapp.com/login';
  isLoggedIn = false;
  redirectUrl: string;

  // constructor(private http: Http) { }
  constructor() { }

  login(email: string, password: string): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let user = {
      name: email,
      password: password
    };
    // return this.http.post(this.url, user, options)
    //   .map(this.extractData)
    //   .catch(this.handleError);
    return Observable.of('true').delay(1000).do(val => this.isLoggedIn = true);
  }

  extractData(response: Response) {
    return 'test stuff';
  }

  handleError(error: any): Promise<any> {
    console.error('An error occured:', error);
    return Promise.reject(error.message || error);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
