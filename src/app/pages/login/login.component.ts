import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { User } from '../../logic/user/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: string;
  messageType: string;
  url: string;

  constructor(
    private router: Router,
    fb: FormBuilder,
    public authService: AuthService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    let email = '';
    let password = '';
    let remember = false;
    if (localStorage.getItem('registration')) {
      let registration = User.decode(localStorage.getItem('registration'));
      email = registration.email;
      password = registration.password;
      remember = true;
    }
    this.form = fb.group({
      'email': [email, Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': [password, Validators.compose([Validators.required, Validators.minLength(4)])],
      'remember': [remember, Validators.required]
    });
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
      this.login(values);
    }
  }

  login(values) {
    this.slimLoadingBarService.start();
    this.authService
      .login(new User().deserialize(values))
      .subscribe(
        (value) => {
          this.slimLoadingBarService.complete();
          if (values.remember) {
            localStorage.setItem('registration', User.getScramble(values.email, values.password));
          } else {
            localStorage.removeItem('registration');
          }
          let redirect = this.authService.redirectUrl || '/dashboard';
          this.authService.redirectUrl = null;
          this.router.navigate([redirect]);
        },
        err => {
          let message = err.message || 'La connection au serveur a échoué.';
          this.slimLoadingBarService.complete();
          this.setMessage(
            message,
            'danger'
          );
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
