import { Routes, RouterModule } from '@angular/router';

import { EditComponent } from './edit.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: EditComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
