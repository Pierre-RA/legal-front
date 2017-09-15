import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { TemplateModule } from '../templates/template.module';
import { LoanSimpleDisplayComponent, LoanSimpleFormComponent } from './loan-simple';
import { MenuComponent } from './menu/menu.component';

const FORMS = [
  LoanSimpleFormComponent
];

const DISPLAYS = [
  LoanSimpleDisplayComponent
];

@NgModule({
  imports: [
    CommonModule,
    TemplateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    ...FORMS,
    ...DISPLAYS,
    MenuComponent,
  ],
  exports: [
    ...FORMS,
    ...DISPLAYS
  ]
})
export class ContractModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ContractModule,
      providers: [],
    };
  }
}
