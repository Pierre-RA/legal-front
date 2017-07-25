import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateModule } from '../../templates/template.module';
import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    routing,
    TemplateModule
  ],
  declarations: [DashboardComponent]
})
export default class DashboardModule { }
