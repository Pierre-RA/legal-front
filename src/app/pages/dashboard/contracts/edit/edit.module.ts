import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { EditComponent } from './edit.component';
import { routing } from './edit.routing';
import { TemplateModule } from '../../../../templates/template.module';
import { CustomDateParserFormatter } from '../../../../logic/dateparser';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    TemplateModule,
    NgbModule,
  ],
  declarations: [EditComponent],
})
export class EditModule { }
