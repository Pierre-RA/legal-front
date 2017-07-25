import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';

import { NotFoundComponent } from './notfound.component';
import { routing } from './notfound.routing';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    routing
  ],
  declarations: [
    NotFoundComponent
  ]
})
export default class WelcomeModule {}
