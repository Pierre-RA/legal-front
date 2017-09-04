import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { IContact } from '../logic/contact.interface';
import Contact from '../logic/contact';

@Injectable()
export class ContactsService {

  url = 'https://api-legal.herokuapp.com/contacts';

  constructor(private http: Http) {}

  findAll(): Observable<Array<IContact>> {
    return this.http.get(this.url, this.getOptions())
      .map(this.extractData)
      .catch(this.handleError);
  }

  findOne(id: string): Observable<IContact> {
    return this.http.get(this.url + '/' + id, this.getOptions())
      .map(this.extractData)
      .catch(this.handleError);
  }

  count(type?: string): Observable<Number> {
    let param = type ? '/' + type : '';
    return this.http.get(this.url + '/count' + param, this.getOptions())
      .map(this.extractCount)
      .catch(this.handleError);
  }

  create(contact: IContact): Observable<Contact> {
    return this.http.post(this.url, contact, this.getOptions())
      .map(this.extractContact)
      .catch(this.handleError);
  }

  update(contact: IContact, id: string): Observable<Contact> {
    return this.http.put(this.url + '/' + id, contact, this.getOptions())
      .map(this.extractData)
      .catch(this.handleError);
  }

  delete(id: string): Observable<String> {
    return this.http.delete(this.url + '/' + id, this.getOptions())
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(response: Response) {
    return response.json();
  }

  extractContact(response: Response) {
    return new Contact().deserialize(response.json());
  }

  extractCount(response: Response) {
    return response.json().count;
  }

  handleError(error: any): Promise<any> {
    console.error('An error occured:', error);
    return Promise.reject(error.message || error);
  }

  getOptions(): RequestOptions {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    let token = localStorage.getItem('token');
    if (token) {
      headers.append('authorization', 'JWT ' + token);
    }
    return new RequestOptions({ headers: headers });
  }
}
