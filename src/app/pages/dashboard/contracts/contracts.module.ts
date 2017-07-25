import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts.component';
import { routing } from './contracts.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ContractsComponent]
})
export default class ContractsModule { }
