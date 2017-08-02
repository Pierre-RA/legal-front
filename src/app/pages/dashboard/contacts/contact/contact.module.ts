import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { routing } from './contact.routing';
import { TemplateModule } from '../../../../templates/template.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    TemplateModule
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
