import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static matchPassword(control) {
    let password = control.get('password').value;
    let confirmPassword = control.get('repeat').value;
    if (password != confirmPassword) {
      control.get('repeat').setErrors({ MatchPassword: true });
      return { 'passwordDontMatch': true };
    } else {
      return null;
    }
  }

}
