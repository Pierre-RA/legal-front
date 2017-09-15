import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { Contact } from '../logic/contact';

@Injectable()
export class ContactsService {

  contactsURL: string;

  constructor(
    private http: Http
  ) {
    this.contactsURL = environment.apiEndpoint + 'contacts';
  }

  findAll(): Observable<Array<Contact>> {
    return this.http.get(this.contactsURL, this.getOptions())
      .map(this.extractContactList)
      .catch(this.handleError);
  }

  findOne(id: string): Observable<Contact> {
    return this.http.get(this.contactsURL + '/' + id, this.getOptions())
      .map(this.extractContact)
      .catch(this.handleError);
  }

  count(type?: string): Observable<Number> {
    let param = type ? '/' + type : '';
    return this.http.get(this.contactsURL + '/count' + param, this.getOptions())
      .map(this.extractCount)
      .catch(this.handleError);
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post(this.contactsURL, contact, this.getOptions())
      .map(this.extractContact)
      .catch(this.handleError);
  }

  update(contact: Contact, id: string): Observable<Contact> {
    return this.http.put(this.contactsURL + '/' + id, contact, this.getOptions())
      .map(this.extractContact)
      .catch(this.handleError);
  }

  delete(id: string): Observable<String> {
    return this.http.delete(this.contactsURL + '/' + id, this.getOptions())
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(response: Response) {
    return response.json();
  }

  extractContact(response: Response) {
    return new Contact().deserialize(response.json());
  }

  extractContactList(response: Response) {
    return Contact.getContactList(response.json());
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
