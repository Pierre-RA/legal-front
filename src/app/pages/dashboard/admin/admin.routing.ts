import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
