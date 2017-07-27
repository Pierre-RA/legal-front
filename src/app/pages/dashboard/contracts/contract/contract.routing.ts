import { Routes, RouterModule } from '@angular/router';

import { ContractComponent } from './contract.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ContractComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
