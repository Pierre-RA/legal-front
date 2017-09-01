import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { TemplateModule } from './templates/template.module';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ContractsService } from './services/contracts.service';
import { ContactsService } from './services/contacts.service';
import { ValidationService } from './services/validation.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateModule.forRoot(),
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    PagesModule,
    routing
  ],
  providers: [
    AuthGuardService,
    AuthService,
    ContractsService,
    ContactsService,
    ValidationService,
  ],
  bootstrap: [AppComponent],
  exports: [SlimLoadingBarModule],
})
export class AppModule { }
