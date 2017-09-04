import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { User } from '../../../logic/user/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: Array<User>;
  tokens: Array<any>;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.users = [];
    this.tokens = [];
    this.form = this.fb.group({
      email: ['', Validators.required]
    });

    this.usersService.getAll()
      .subscribe(users => {
        this.users = users;
      });

    this.usersService.getTokens()
      .subscribe(tokens => {
        this.tokens = tokens;
      });
  }

  ngOnInit() {
  }

  onSubmit(value) {
    this.usersService.sendInvite(value)
      .subscribe(bool => {
        this.usersService.getTokens()
          .subscribe(tokens => {
            this.tokens = tokens;
          });
      });
  }

}
