import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';

import { WelcomeComponent } from './welcome.component';
import { routing } from './welcome.routing';
import { TemplateModule } from '../../templates/template.module';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    routing,
    TemplateModule,
  ],
  declarations: [
    WelcomeComponent
  ]
})
export class WelcomeModule {}
