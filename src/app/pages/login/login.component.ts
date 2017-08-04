import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: AbstractControl;
  password: AbstractControl;
  form: FormGroup;
  message: string;
  messageType: string;
  url: string;

  constructor(private router: Router, fb: FormBuilder, public authService: AuthService) {
    this.form = fb.group({
      'email': ['test@legal.ch', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    if (this.authService.redirectUrl) {
      this.setMessage(
        'Connexion requise pour accéder à la page ' + this.authService.redirectUrl,
        'danger'
      );
    }
    this.url = this.authService.redirectUrl || '/dashboard';
  }

  ngOnInit() {
  }

  onSubmit(values: Object): void {
    this.setMessage(
      'Login ou mot de passe incorrect.',
      'danger'
    );
    if (this.form.valid) {
      this.setMessage(
        'En cours de connexion...',
        'success'
      );
      this.login();
    }
  }

  login() {
    this.authService
      .login(this.form.controls['email'].value, this.form.controls['password'].value)
      .subscribe(
        data => {
          this.authService.setToken(data);
          let redirect = this.authService.redirectUrl || '/dashboard';
          this.router.navigate([redirect]);
        },
        err => {
          this.setMessage(
            'Connection to server failed.',
            'danger'
          );
          console.error(err);
        }
      );
  }

  logout() {
    this.authService.logout();
  }

  setMessage(message: string, type: string) {
    this.message = message;
    this.messageType = type;
  }

}
