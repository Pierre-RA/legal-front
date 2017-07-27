import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import "rxjs/add/operator/filter";

interface Breadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'template-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: Breadcrumb[];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.breadcrumbs = [];
  }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.breadcrumbs = this.getBreadcrumbs(this.route.root);
    });
  }

  getBreadcrumbs(route: ActivatedRoute, url: string='', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';
    console.log('getBreadcrumbs: 1.');

    let children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (let child of children) {
      console.log('getBreadcrumbs: child +');
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      let routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      url += `${routeURL}`;

      let breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      }
      breadcrumbs.push(breadcrumb);

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
