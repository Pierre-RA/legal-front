import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppTranslationModule } from '../../app.translation.module';
import { TemplateModule } from '../../templates/template.module';

import { RegisterComponent } from './register.component';
import { routing } from './register.routing';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    TemplateModule,
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule {}
