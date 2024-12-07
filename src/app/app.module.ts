import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './job-market-components/dashboard/dashboard.component';
import { RegistrationComponent } from './job-market-components/registration/registration.component';
import { LoginComponent } from './job-market-components/login/login.component';
import { JobsComponent } from './job-market-components/jobs/jobs.component';
import { JobDetailsComponent } from './job-market-components/job-details/job-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegistrationComponent,
    LoginComponent,
    JobsComponent,
    JobDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
