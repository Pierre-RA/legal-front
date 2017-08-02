import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    children: [{
      path: 'list',
      loadChildren: 'app/pages/dashboard/contacts/contactlist/contactlist.module#ContactlistModule',
      data: { breadcrumb: 'Liste' }
    }, {
      path: 'add',
      loadChildren: 'app/pages/dashboard/contacts/edit/edit.module#EditModule',
      data: { breadcrumb: 'Nouveau', edit: 'false' }
    }, {
      path: 'edit/:id',
      loadChildren: 'app/pages/dashboard/contacts/edit/edit.module#EditModule',
      data: { breadcrumb: 'Nouveau', edit: 'true' }
    }, {
      path: ':id',
      loadChildren: 'app/pages/dashboard/contacts/contact/contact.module#ContactModule',
      data: { breadcrumb: 'Contact' }
    }, {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    }]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
