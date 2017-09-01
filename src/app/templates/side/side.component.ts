import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User } from '../../logic/user/user';

@Component({
  selector: 'template-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.user = null;
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

}
