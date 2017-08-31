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
  getOwn = 'https://api-legal.herokuapp.com/users/own';
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
        this.user = response.json()['user'];
        this.sub.next(response.json()['user']);
        return true;
      })
      .catch(this.handleError);
  }

  isLoggedIn(): Observable<User> {
    if (!window.localStorage.getItem('token')) {
      return new BehaviorSubject<User>(null);
    }
    if (this.user && this.sub) {
      return this.sub;
    }
    let token = window.localStorage.getItem('token');
    let headers = new Headers();
    headers.append('authorization', 'JWT ' + token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.getOwn, options)
      .map((response: Response) => {
        this.user = response.json();
        this.sub.next(this.user);
        return this.user;
      })
      .catch(this.handleError);
  };

  getUser(): Observable<User> {
    if (this.user) {
      return this.sub;
    }
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
    this.sub.next(null);
    this.token = '';
  }

}
