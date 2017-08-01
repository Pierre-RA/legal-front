import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { routing } from './contacts.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ContactsComponent]
})
export class ContactsModule { }
