import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message: string;
  messageType: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private validationService: ValidationService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    this.form = fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'repeat': ['', Validators.required]
    }, {
      validator: ValidationService.matchPassword
    });
  }

  ngOnInit() {
  }

  onSubmit(values: Object): void {
    this.setMessage(
      'Veuillez remplir tous les champs.',
      'danger'
    );
    if (this.form.valid) {
      this.setMessage(
        'En cours d\'inscription...',
        'success'
      );
      this.register(values);
    }
  }

  register(values: Object) {
    console.log(values);
  }

  setMessage(message: string, type: string) {
    this.message = message;
    this.messageType = type;
  }

}
