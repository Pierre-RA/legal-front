import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
