import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: AbstractControl;
  password: AbstractControl;
  form: FormGroup;

  constructor(private router: Router, fb: FormBuilder) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {
  }

  onSubmit(values: Object): void {
    console.log('submit');
    if (this.form.valid) {
      this.login();
    }
  }

  login() {
    this.router.navigate(['/dashboard'], {});
  }

}
