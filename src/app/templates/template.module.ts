import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TopComponent } from './top';
import { SideComponent } from './side';
import { BreadcrumbComponent } from './breadcrumb';
import { ContactComponent } from './contact';

import { PhonePipe } from './pipes/phone';

const COMPONENTS = [
  TopComponent,
  SideComponent,
  BreadcrumbComponent,
  ContactComponent,
];

const PIPES = [
  PhonePipe,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
  ]
})
export class TemplateModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: TemplateModule,
      providers: [],
    };
  }
}
