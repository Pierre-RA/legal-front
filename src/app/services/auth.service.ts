import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User } from '../logic/user/user';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  loginURL: string;
  registerURL: string;
  usersOwnURL: string;
  rootURL: string;
  redirectUrl: string;
  token: string;
  user: User;
  sub: Subject<User> = new BehaviorSubject<any>(null);

  constructor(
    private http: Http,
  ) {
    this.loginURL = environment.apiEndpoint + 'login';
    this.registerURL = environment.apiEndpoint + 'signup';
    this.usersOwnURL = environment.apiEndpoint + 'users/own';
    this.rootURL = environment.apiEndpoint;
    this.token = '';
    this.user = null;
  }

  connect(): Observable<boolean | Object> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.rootURL, options)
      .map((response: Response) => {
        return true;
      })
      .catch(this.handleError);
  }

  login(user: User): Observable<Response | Object> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.loginURL, user.getLoginCredentials(), options)
      .map((response: Response) => {
        this.setToken(response.json()['token']);
        this.user = response.json()['user'];
        this.sub.next(response.json()['user']);
        return response;
      })
      .catch(this.handleError);
  }

  register(values: any, token?: string): Observable<boolean | Object> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (token) {
      headers.append('authorization', token);
    }
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.registerURL, values, options)
      .map((response: Response) => {
        return response.json();
      })
      .flatMap((responseBody) => {
        let user = {
          email: values.email,
          password: values.password,
        }
        return this.http.post(this.loginURL, values)
          .map((response: Response) => {
            this.setToken(response.json()['token']);
            this.user = response.json()['user'];
            this.sub.next(response.json()['user']);
            return true;
          });
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
    return this.http.get(this.usersOwnURL, options)
      .map((response: Response) => {
        this.user = response.json();
        this.sub.next(this.user);
        return this.user;
      })
      .catch((error: Response) => {
        return new BehaviorSubject<User>(null);
      });
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

  handleError(error: Response): Observable<Object> {
    console.error('AuthService Error', JSON.parse(error['_body']));
    return Observable.throw(JSON.parse(error['_body']));
  }

  logout(): void {
    window.localStorage.removeItem('token');
    this.user = null;
    this.sub.next(null);
    this.token = '';
  }

}
