import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  url = 'https://api-legal.herokuapp.com/login';
  redirectUrl: string;
  token: string;
  loggedIn: boolean;

  constructor(private http: Http) {
    this.token = '';
    this.loggedIn = false;
  }

  login(email: string, password: string): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let user = {
      name: email,
      password: password
    };
    return this.http.post(this.url, user, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  isTokenValid(token: string): Observable<boolean> {
    return this.http.post(this.url, token)
      .map(data => {
        console.log(data);
      })
      .catch(this.handleError);
  }

  extractData(response: Response) {
    return response.json()['token'];
  }

  handleError(error: any): Promise<any> {
    console.error('An error occured:', error);
    return Promise.reject(error.message || error);
  }

  setToken(token: string): void {
    this.loggedIn = true;
    this.token = token;
    window.localStorage.setItem('token', token);
  }

  logout(): void {
    this.loggedIn = false;
    this.token = '';
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

}
