import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: 'overview',
      loadChildren: 'app/pages/dashboard/overview/overview.module',
    }, {
      path: 'contracts',
      loadChildren: 'app/pages/dashboard/contracts/contracts.module',
    }, {
      path: '',
      redirectTo: 'overview'
    }]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
