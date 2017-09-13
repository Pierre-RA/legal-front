import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'template-server-light',
  templateUrl: './server-light.component.html',
  styleUrls: ['./server-light.component.scss']
})
export class ServerLightComponent implements OnInit {

  hasServerLoaded: boolean;

  constructor(
    private authService: AuthService
  ) {
    this.hasServerLoaded = false;
  }

  ngOnInit() {
    this.authService.connect().subscribe(bool => {
      if (bool) {
        this.hasServerLoaded = true;
      }
    });
  }

}
