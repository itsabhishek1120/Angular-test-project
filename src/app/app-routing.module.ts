import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./auth.guard";
import { DashboardComponent } from './job-market-components/dashboard/dashboard.component';
import { RegistrationComponent } from './job-market-components/registration/registration.component';
import { LoginComponent } from './job-market-components/login/login.component';
import { JobsComponent } from './job-market-components/jobs/jobs.component';
import { JobDetailsComponent } from "./job-market-components/job-details/job-details.component";
import { ServicesComponent } from './job-market-components/services/services.component';
import { CompaniesComponent } from './job-market-components/companies/companies.component';
import { PostJobComponent } from './job-market-components/post-job/post-job.component';
import { ProfileComponent } from './job-market-components/profile/profile.component';
import { EditProfileComponent } from './job-market-components/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    // canActivate: [AuthGuard], // Protect this route
    data: { title: 'Dashboard' },
  },
  {
    path: "registration",
    component: RegistrationComponent,
    data: { title: 'Registration Form' },
  },
  {
    path: "login",
    component: LoginComponent,
    data: { title: 'Login Form' },
  },
  {
    path: "jobs",
    component: JobsComponent,
    canActivate: [AuthGuard], // Protect this route
    data: { title: 'Jobs' },
  },
  {
    path: "job-detail/:id",
    component: JobDetailsComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  {
    path: "services",
    component: ServicesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Services' },
  },
  {
    path: "companies",
    component: CompaniesComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  {
    path: "post-job",
    component: PostJobComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  {
    path: "edit-profile",
    component: EditProfileComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  {
    path: "**",
    component: DashboardComponent,
    data: { title : 'No path' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
