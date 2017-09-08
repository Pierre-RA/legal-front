import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'template-copyright-small',
  templateUrl: './copyright-small.component.html',
  styleUrls: ['./copyright-small.component.scss']
})
export class CopyrightSmallComponent implements OnInit {

  appVersion: string;

  constructor() {
    this.appVersion = environment.version;
  }

  ngOnInit() {
  }

}
