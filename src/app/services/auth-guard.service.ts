import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.isLoggedIn().subscribe(user => {
        if (!user) {
          this.authService.redirectUrl = state.url;
          this.router.navigate(['/login']);
        }
        resolve(!!user);
      });
    });
  }

  canActivateChild(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.isLoggedIn().subscribe(user => {
        if (!user) {
          this.authService.redirectUrl = state.url;
          this.router.navigate(['/login']);
        }
        resolve(!!user);
      });
    });
  }

}
