import { Routes, RouterModule }  from '@angular/router';
import { PagesComponent } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'dashboard',
    loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule',
    // canActivate: [ AuthGuardService ],
    canActivateChild: [ AuthGuardService ],
    data: {
      requiresLogin: true,
      breadcrumb: 'Dashboard'
    }
  },
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'presentation', pathMatch: 'full' },
      { path: 'notfound', loadChildren: 'app/pages/notfound/notfound.module#NotFoundModule' },
      { path: 'presentation', loadChildren: 'app/pages/welcome/welcome.module#WelcomeModule', data: { keepRoute: true } },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
