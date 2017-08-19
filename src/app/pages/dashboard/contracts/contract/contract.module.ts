import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponent } from './contract.component';
import { routing } from './contract.routing';
import { TemplateModule } from '../../../../templates/template.module';

@NgModule({
  imports: [
    TemplateModule,
    CommonModule,
    routing
  ],
  declarations: [ContractComponent],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
})
export class ContractModule { }
