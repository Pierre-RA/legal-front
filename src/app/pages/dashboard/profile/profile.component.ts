import { Component, OnInit } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../../services/auth.service';
import { User } from '../../../logic/user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ NgbTooltip ]
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    public authService: AuthService
  ) {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.user.image = 'assets/img/unknown.png';
    });
  }

  ngOnInit() {
  }

}
