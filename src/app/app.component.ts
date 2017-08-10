import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private sub: any;

  constructor(
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.slimLoadingBarService.start();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.slimLoadingBarService.complete();
      }
    }, (error: any) => {
      this.slimLoadingBarService.complete();
    });
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
  }
}
