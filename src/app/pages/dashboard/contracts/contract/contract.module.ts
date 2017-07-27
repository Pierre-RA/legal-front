import { NgModule } from '@angular/core';
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
  declarations: [ContractComponent]
})
export class ContractModule { }
