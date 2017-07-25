import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateModule } from '../../../templates/template.module';
import { OverviewComponent } from './overview.component';
import { routing } from './overview.routing';

@NgModule({
  imports: [
    CommonModule,
    TemplateModule,
    routing
  ],
  declarations: [OverviewComponent]
})
export default class OverviewModule { }
