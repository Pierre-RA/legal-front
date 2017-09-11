import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'template-copyright-big',
  templateUrl: './copyright-big.component.html',
  styleUrls: ['./copyright-big.component.scss']
})
export class CopyrightBigComponent implements OnInit {

  appVersion: string;

  constructor() {
    this.appVersion = environment.version;
  }

  ngOnInit() {
  }

}
