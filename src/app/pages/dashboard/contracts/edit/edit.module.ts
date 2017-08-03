import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditComponent } from './edit.component';
import { routing } from './edit.routing';
import { TemplateModule } from '../../../../templates/template.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    TemplateModule,
  ],
  declarations: [EditComponent]
})
export class EditModule { }
