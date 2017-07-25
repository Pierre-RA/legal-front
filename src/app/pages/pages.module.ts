import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateModule } from '../templates/template.module';
import { routing } from './pages.routing';
import { AppTranslationModule } from '../app.translation.module';

import { PagesComponent } from './pages.component';

@NgModule({
  imports: [ CommonModule, AppTranslationModule, routing, TemplateModule ],
  declarations: [ PagesComponent ]
})
export class PagesModule {
}
