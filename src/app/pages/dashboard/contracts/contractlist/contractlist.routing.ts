import { Routes, RouterModule } from '@angular/router';

import { ContractlistComponent } from './contractlist.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ContractlistComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
