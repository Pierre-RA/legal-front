import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', loadChildren: 'app/pages/welcome/welcome.module#WelcomeModule', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/notfound' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
