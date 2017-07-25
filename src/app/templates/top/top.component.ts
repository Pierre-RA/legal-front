import { Component, OnInit } from '@angular/core';

import { User } from '../../logic/user/user';

@Component({
  selector: 'template-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  title: string = 'Legal';
  user: User;
  isLogged: boolean;

  constructor() {
    this.title = 'Legal';
    this.isLogged = false;
    this.user = new User();
  }

  ngOnInit() {
  }

}
