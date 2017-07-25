import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
