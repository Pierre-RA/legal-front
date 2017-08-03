import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  isLogged: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isLogged = this.authService.isLoggedIn();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.isLogged) {
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);

    return false;
  }

}
