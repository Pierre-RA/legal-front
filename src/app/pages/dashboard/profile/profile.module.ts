import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    routing,
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
