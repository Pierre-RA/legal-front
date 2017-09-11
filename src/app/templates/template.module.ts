import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppTranslationModule } from '../app.translation.module';

import { TopComponent } from './top';
import { SideComponent } from './side';
import { BreadcrumbComponent } from './breadcrumb';
import { ContactComponent } from './contact';
import { CopyrightSmallComponent } from './copyright-small';
import { CopyrightBigComponent } from './copyright-big';
import { ServerLightComponent } from './server-light';

import { PhonePipe } from './pipes/phone';

const COMPONENTS = [
  TopComponent,
  SideComponent,
  BreadcrumbComponent,
  ContactComponent,
  CopyrightSmallComponent,
  CopyrightBigComponent,
  ServerLightComponent,
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
    AppTranslationModule,
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
