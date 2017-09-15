import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponent } from './contract.component';
import { routing } from './contract.routing';
import { TemplateModule } from '../../../../templates/template.module';
import { ContractModule as CModule } from '../../../../contracts/contract.module';
import { LoanSimpleDisplayComponent } from '../../../../contracts/loan-simple';

@NgModule({
  entryComponents: [ LoanSimpleDisplayComponent ],
  imports: [
    TemplateModule,
    CModule,
    CommonModule,
    routing
  ],
  declarations: [ContractComponent],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
})
export class ContractModule { }
