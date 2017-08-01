import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { Contract } from '../logic/contract';

@Injectable()
export class ContractsService {

  url = 'https://api-legal.herokuapp.com/contracts';

  constructor(private http: Http) { }

  findAll(): Observable<Array<Contract>> {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  findOne(id: string): Observable<Contract> {
    return this.http.get(this.url + '/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  count(): Observable<Number> {
    return this.http.get(this.url + '/count')
      .map(this.extractData)
      .catch(this.handleError);
  }

  create(): Observable<String> {
    return this.http.post(this.url, {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  update(contract: Contract, id: string): Observable<String> {
    return this.http.put(this.url + '/' + id, contract)
      .map(this.extractData)
      .catch(this.handleError);
  }

  delete(id: string): Observable<String> {
    return this.http.delete(this.url + '/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(response: Response) {
    return response.json();
  }

  handleError(error: any): Promise<any> {
    console.error('An error occured:', error);
    return Promise.reject(error.message || error);
  }

}
