import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditComponent } from './edit.component';
import { routing } from './edit.routing';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EditComponent]
})
export class EditModule { }
