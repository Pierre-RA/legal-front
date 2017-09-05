import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private usersService: UsersService,
    private modalService: NgbModal,
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

  onDropToken(id) {
    this.usersService.removeToken(id)
      .subscribe(bool => {
        this.usersService.getTokens()
          .subscribe(tokens => {
            this.tokens = tokens;
          });
      });
  }

  open(content, id) {
    this.modalService.open(content).result.then((result) => {
      this.onDropToken(id);
    }, dismissed => {});
  }

}
