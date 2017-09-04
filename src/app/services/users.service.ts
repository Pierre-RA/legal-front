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
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'JWT ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.get(environment.apiEndpoint + 'users', options)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occured:', error);
    return Promise.reject(error.message || error);
  }

}
