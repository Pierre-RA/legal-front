import { Routes, RouterModule } from '@angular/router';

import { ContractsComponent } from './contracts.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ContractsComponent,
    children: [{
      path: 'list',
      loadChildren: 'app/pages/dashboard/contracts/contractlist/contractlist.module#ContractlistModule',
      data: { breadcrumb: 'Liste' }
    }, {
      path: 'add',
      loadChildren: 'app/pages/dashboard/contracts/edit/edit.module#EditModule',
      data: { breadcrumb: 'Nouveau', edit: 'false' }
    }, {
      path: 'edit/:id',
      loadChildren: 'app/pages/dashboard/contracts/edit/edit.module#EditModule',
      data: { breadcrumb: 'Nouveau', edit: 'true' }
    }, {
      path: ':id',
      loadChildren: 'app/pages/dashboard/contracts/contract/contract.module#ContractModule',
      data: { breadcrumb: 'Contrat' }
    }, {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    }]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
