import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { environment } from '../../environments/environment';
import { User } from '../logic/user/user';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

@Injectable()
export class UsersService {

  constructor(
    private http: Http
  ) { }

  getAll(): Observable<Array<User>> {
    return this.http.get(environment.apiEndpoint + 'users', this.getHeaders())
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getTokens(): Observable<Array<any>> {
    return this.http.get(environment.apiEndpoint + 'tokens', this.getHeaders())
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  sendInvite(value): Observable<boolean> {
    return this.http.post(environment.apiEndpoint + 'tokens', value, this.getHeaders())
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  removeToken(id: string): Observable<boolean> {
    return this.http.delete(environment.apiEndpoint + 'tokens/' + id, this.getHeaders())
      .map((response: Response) => {
        return true;
      })
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occured:', error);
    return Promise.reject(error.message || error);
  }

  getHeaders(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'JWT ' + localStorage.getItem('token'));
    return new RequestOptions({ headers: headers });
  }

}
