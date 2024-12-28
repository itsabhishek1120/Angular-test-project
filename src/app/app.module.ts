import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './job-market-components/dashboard/dashboard.component';
import { RegistrationComponent } from './job-market-components/registration/registration.component';
import { LoginComponent } from './job-market-components/login/login.component';
import { JobsComponent } from './job-market-components/jobs/jobs.component';
import { JobDetailsComponent } from './job-market-components/job-details/job-details.component';
import { ServicesComponent } from './job-market-components/services/services.component';
import { CompaniesComponent } from './job-market-components/companies/companies.component';
import { PostJobComponent } from './job-market-components/post-job/post-job.component';
import { NavbarComponent } from './job-market-components/navbar/navbar.component';
import { FooterComponent } from './job-market-components/footer/footer.component';
import { LoaderComponent } from './job-market-components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegistrationComponent,
    LoginComponent,
    JobsComponent,
    JobDetailsComponent,
    ServicesComponent,
    CompaniesComponent,
    PostJobComponent,
    NavbarComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
