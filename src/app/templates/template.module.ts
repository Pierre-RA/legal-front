import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopComponent } from './top';

const COMPONENTS = [
  TopComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS,
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
