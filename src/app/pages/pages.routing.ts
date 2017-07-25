import { Routes, RouterModule }  from '@angular/router';
import { PagesComponent } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuardService } from '../auth-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module'
  },
  {
    path: 'dashboard',
    loadChildren: 'app/pages/dashboard/dashboard.module',
    // canActivate: [ AuthGuardService ],
    data: { requiresLogin: true }
  },
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'presentation', pathMatch: 'full' },
      { path: 'notfound', loadChildren: 'app/pages/notfound/notfound.module' },
      { path: 'presentation', loadChildren: 'app/pages/welcome/welcome.module', data: { keepRoute: true } },
      // { path: 'dashboard', loadChildren: './dashboard/dashboard.module' },
  //     { path: 'editors', loadChildren: './editors/editors.module#EditorsModule' },
  //     { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
  //     { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
  //     { path: 'ui', loadChildren: './ui/ui.module#UiModule' },
  //     { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
  //     { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
  //     { path: 'maps', loadChildren: './maps/maps.module#MapsModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
