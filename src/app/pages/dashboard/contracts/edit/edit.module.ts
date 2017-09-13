import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditComponent } from './edit.component';
import { routing } from './edit.routing';
import { TemplateModule } from '../../../../templates/template.module';
import { CustomDateParserFormatter } from '../../../../logic/dateparser';
import { MenuComponent, LoanSimpleFormComponent } from '../../../../contracts';
import { ContractModule } from '../../../../contracts/contract.module';

@NgModule({
  entryComponents: [ MenuComponent, LoanSimpleFormComponent ],
  imports: [
    CommonModule,
    routing,
    TemplateModule,
    ContractModule
  ],
  declarations: [EditComponent],
})
export class EditModule { }
