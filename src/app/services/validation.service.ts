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

  static contactValidator(control) {
    let errors = {};
    if (control.get('type').value == 'moral') {
      if (!control.get('reason').value) {
        control.get('reason').setErrors({ noReason: true });
        errors['noReason'] = true;
      }
    }
    if (control.get('type').value == 'physical') {
      if (!control.get('gender').value) {
        control.get('gender').setErrors({ noGender: true });
        errors['genderNotTicked'] = true;
      }
      if (!control.get('firstName').value) {
        control.get('firstName').setErrors({ noFirstName: true });
        errors['noFirstName'] = true;
      }
      if (!control.get('lastName').value) {
        control.get('lastName').setErrors({ noLastName: true });
        errors['noLastName'] = true;
      }
    }
    return errors;
  }

}
