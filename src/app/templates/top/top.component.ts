import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../services/auth.service';
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

  constructor(
    public authService: AuthService,
    private router: Router,
    config: NgbDropdownConfig,
    private zone: NgZone
  ) {
    this.title = 'Legal';
    this.user = null;
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
