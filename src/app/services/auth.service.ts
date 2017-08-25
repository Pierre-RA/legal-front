import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { User } from '../logic/user/user';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  url = 'https://api-legal.herokuapp.com/login';
  redirectUrl: string;
  token: string;
  user: User;
  sub: Subject<User> = new BehaviorSubject<any>(null);

  constructor(private http: Http) {
    this.token = '';
    this.user = null;
  }

  login(email: string, password: string): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let user = {
      email: email,
      password: password
    };
    return this.http.post(this.url, user, options)
      .map((response: Response) => {
        this.setToken(response.json()['token']);
        this.sub.next(response.json()['user']);
        return true;
      })
      .catch(this.handleError);
  }

  getUser(): Observable<User> {
    return this.sub;
  }

  setToken(token: string): void {
    this.token = token;
    window.localStorage.setItem('token', token);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occured:', error);
    return Promise.reject(error.message || error);
  }

  logout(): void {
    window.localStorage.removeItem('token');
    this.user = null;
    this.token = '';
  }

}
