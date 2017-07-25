import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../pages/auth.service';
import { User } from '../../logic/user/user';

@Component({
  selector: 'template-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
  providers: [ NgbDropdownConfig ]
})
export class TopComponent implements OnInit {

  title: string = 'Legal';
  user: User;
  isLogged: boolean;

  constructor(public authService: AuthService, private router: Router, config: NgbDropdownConfig) {
    this.title = 'Legal';
    this.isLogged = this.authService.isLoggedIn;
    this.user = new User('Pierre Repetto-Andipatin');
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
