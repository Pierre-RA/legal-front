import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TopComponent } from './top';
import { SideComponent } from './side';

const COMPONENTS = [
  TopComponent,
  SideComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
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
