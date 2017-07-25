import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
      'email': ['pierre@anthillsolutions.ch', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['bull', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.setMessage();
    this.url = this.authService.redirectUrl || '/dashboard';
  }

  ngOnInit() {
  }

  onSubmit(values: Object): void {
    this.message = 'Login ou mot de passe incorrect.';
    if (this.form.valid) {
      this.login();
      this.message = 'En cours de connexion...';
      this.messageType = 'success';
    }
  }

  login() {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl || '/dashboard';
        this.router.navigate([redirect]);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  setMessage() {
    if (this.authService.redirectUrl) {
      this.message = 'Connexion requise pour accéder à la page ' +
        this.authService.redirectUrl;
      this.messageType = 'alert';
    }
  }

}
