import { Routes, RouterModule } from '@angular/router';

import { ContractsComponent } from './contracts.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ContractsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
