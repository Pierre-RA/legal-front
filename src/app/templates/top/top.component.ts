import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from "rxjs/Subscription";

import { AuthService } from '../../services/auth.service';
import { User } from '../../logic/user/user';

@Component({
  selector: 'template-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
  providers: [ NgbDropdownConfig ]
})
export class TopComponent implements OnInit {

  title: string;
  user: User;
  subscription: Subscription;

  constructor(
    public authService: AuthService,
    private router: Router,
    config: NgbDropdownConfig,
    private zone: NgZone
  ) {
    this.title = 'Legal';
    this.user = null;
  }

  ngOnInit() {
    this.subscription = this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
