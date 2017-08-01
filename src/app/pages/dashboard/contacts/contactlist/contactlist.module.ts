import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactlistComponent } from './contactlist.component';
import { routing } from './contactlist.routing';
import { TemplateModule } from '../../../../templates/template.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    TemplateModule,
  ],
  declarations: [ContactlistComponent]
})
export class ContactlistModule { }
