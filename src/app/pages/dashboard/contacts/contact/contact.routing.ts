import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ContactComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
