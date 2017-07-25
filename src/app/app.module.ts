import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { TemplateModule } from './templates/template.module';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './pages/auth.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
