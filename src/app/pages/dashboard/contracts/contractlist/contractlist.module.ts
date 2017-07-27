import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractlistComponent } from './contractlist.component';
import { routing } from './contractlist.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ContractlistComponent]
})
export class ContractlistModule { }
