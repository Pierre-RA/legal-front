import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';

import { RegisterComponent } from './register.component';
import { routing } from './register.routing';
import { TemplateModule } from '../../templates/template.module';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    routing,
    TemplateModule,
  ],
  declarations: [
    RegisterComponent
  ]
})
export default class RegisterModule {}
