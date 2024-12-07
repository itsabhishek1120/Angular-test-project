import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './job-market-components/dashboard/dashboard.component';
import { RegistrationComponent } from './job-market-components/registration/registration.component';
import { LoginComponent } from './job-market-components/login/login.component';
import { JobsComponent } from './job-market-components/jobs/jobs.component';
import { JobDetailsComponent } from "./job-market-components/job-details/job-details.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    data: { title : 'Dashboard' }
  },
  {
    path: "registration",
    component: RegistrationComponent,
    data: { title : 'Reistration Form' }
  },
  {
    path: "login",
    component: LoginComponent,
    data: { title : 'Login Form' }
  },
  {
    path: "jobs",
    component: JobsComponent,
    data: { title : 'Login Form' }
  },
  {
    path: 'job-detail/:id',
    component: JobDetailsComponent
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
