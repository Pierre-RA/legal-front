import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AdminGuardService } from '../../services/admin-guard.service';

import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: 'overview',
      loadChildren: 'app/pages/dashboard/overview/overview.module#OverviewModule',
      data: { breadcrumb: 'Aperçu' }
    }, {
      path: 'contracts',
      loadChildren: 'app/pages/dashboard/contracts/contracts.module#ContractsModule',
      data: { breadcrumb: 'Contrats' }
    }, {
      path: 'contacts',
      loadChildren: 'app/pages/dashboard/contacts/contacts.module#ContactsModule',
      data: { breadcrumb: 'Contacts' }
    }, {
      path: 'profile',
      loadChildren: 'app/pages/dashboard/profile/profile.module#ProfileModule',
      data: { breadcrumb: 'Profile' }
    }, {
      path: 'settings',
      loadChildren: 'app/pages/dashboard/settings/settings.module#SettingsModule',
      data: { breadcrumb: 'Settings' }
    }, {
      path: 'admin',
      loadChildren: 'app/pages/dashboard/admin/admin.module#AdminModule',
      data: { breadcrumb: 'Admin' },
      canActivate: [ AdminGuardService ]
    }, {
      path: 'reports',
      redirectTo: 'overview'
    }, {
      path: 'more',
      redirectTo: 'overview'
    }, {
      path: '',
      redirectTo: 'overview'
    }]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
