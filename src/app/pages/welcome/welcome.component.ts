import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  private routeFragmentSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  ngAfterViewChecked() {
    this.routeFragmentSubscription = this.activatedRoute.fragment
      .subscribe(fragment => {
        if (fragment) {
          let element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView();
          }
        } else {
          window.scroll(0,0);
        }
      });
  }

  ngOnDestroy() {
    this.routeFragmentSubscription.unsubscribe();
  }

}
