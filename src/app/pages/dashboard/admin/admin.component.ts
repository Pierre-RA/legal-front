import { Component, OnInit } from '@angular/core';

import { User } from '../../../logic/user/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private users: Array<User>;

  constructor(
    private usersService: UsersService
  ) {
    this.users = [];
    this.usersService.getAll()
      .subscribe(users => {
        this.users = users;
      });
  }

  ngOnInit() {
  }

}
