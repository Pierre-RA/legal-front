import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TemplateModule } from '../../../templates/template.module';
import { OverviewComponent } from './overview.component';
import { routing } from './overview.routing';

@NgModule({
  imports: [
    CommonModule,
    TemplateModule,
    NgbModule,
    routing
  ],
  declarations: [OverviewComponent]
})
export class OverviewModule { }
