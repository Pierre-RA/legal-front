import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './notfound.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
