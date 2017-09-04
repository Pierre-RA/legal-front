import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { IContract } from '../logic/contract.interface';
import { Contract } from '../logic/contract';

@Injectable()
export class ContractsService {

  contractsURL: string;

  constructor(
    private http: Http
  ) {
    this.contractsURL = environment.apiEndpoint + 'contracts';
  }

  findAll(): Observable<Array<IContract>> {
    return this.http.get(this.contractsURL, this.getOptions())
      .map(this.extractData)
      .catch(this.handleError);
  }

  findOne(id: string): Observable<Contract> {
    return this.http.get(this.contractsURL + '/' + id, this.getOptions())
      .map(this.extractData)
      .catch(this.handleError);
  }

  count(type?: number): Observable<Number> {
    let param = type ? '/' + type : '';
    return this.http.get(this.contractsURL + '/count' + param, this.getOptions())
      .map(this.extractCount)
      .catch(this.handleError);
  }

  create(contract: IContract): Observable<Contract> {
    return this.http.post(this.contractsURL, contract, this.getOptions())
      .map(this.extractContract)
      .catch(this.handleError);
  }

  update(contract: IContract, id: string): Observable<Contract> {
    return this.http.put(this.contractsURL + '/' + id, contract, this.getOptions())
      .map(this.extractContract)
      .catch(this.handleError);
  }

  delete(id: string): Observable<String> {
    return this.http.delete(this.contractsURL + '/' + id, this.getOptions())
      .map(this.extractData)
      .catch(this.handleError);
  }

  export(id: string): Observable<Blob> {
    return this.http.get(
      this.contractsURL + '/export/' + id,
      { 'responseType': ResponseContentType.Blob }
      // TODO: fix authorization + Content-Type Blob
      // this.getOptions()
    )
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
  }

  handleError(error: any): Promise<any> {
    console.error('An error occured:', error);
    return Promise.reject(error.message || error);
  }

  getOptions(key?: string, value?: any): RequestOptions {
    let headers: Headers = new Headers();
    let token = localStorage.getItem('token');
    if (token) {
      headers.append('authorization', 'JWT ' + token);
    }
    headers.append('Content-Type', 'application/json');
    let request = new RequestOptions({ headers: headers });
    return request;
  }

}
