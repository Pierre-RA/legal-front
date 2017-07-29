import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppTranslationModule } from '../../app.translation.module';
import { LoginComponent } from './login.component';
import { routing } from './login.routing';
import { TemplateModule } from '../../templates/template.module';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    routing,
    TemplateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {}
