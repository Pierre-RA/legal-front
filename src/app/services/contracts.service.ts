import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { IContract } from '../logic/contract.interface';
import { Contract } from '../logic/contract';

@Injectable()
export class ContractsService {

  url = 'https://api-legal.herokuapp.com/contracts';

  constructor(private http: Http) { }

  findAll(): Observable<Array<IContract>> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  findOne(id: string): Observable<Contract> {
    return this.http.get(this.url + '/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  count(type?: number): Observable<Number> {
    let param = type ? '/' + type : '';
    return this.http.get(this.url + '/count' + param)
      .map(this.extractCount)
      .catch(this.handleError);
  }

  create(contract: IContract): Observable<Contract> {
    return this.http.post(this.url, contract)
      .map(this.extractContract)
      .catch(this.handleError);
  }

  update(contract: IContract, id: string): Observable<Contract> {
    return this.http.put(this.url + '/' + id, contract)
      .map(this.extractContract)
      .catch(this.handleError);
  }

  delete(id: string): Observable<String> {
    return this.http.delete(this.url + '/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  export(id: string): Observable<Blob> {
    return this.http.get(this.url + '/export/' + id, {responseType: ResponseContentType.Blob})
      .map(this.extractFile)
      .catch(this.handleError);
  }

  extractData(response: Response) {
    return response.json();
  }

  extractContract(response: Response) {
    return new Contract().deserialize(response.json());
  }

  extractCount(response: Response) {
    return response.json().count;
  }

  extractFile(response: Response) {
    return response.blob();
    // return new Blob([response.blob()], {
    //   type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
  }

  handleError(error: any): Promise<any> {
    console.error('An error occured:', error);
    return Promise.reject(error.message || error);
  }

}
