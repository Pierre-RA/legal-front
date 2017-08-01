import { Routes, RouterModule } from '@angular/router';

import { ContactlistComponent } from './contactlist.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ContactlistComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
