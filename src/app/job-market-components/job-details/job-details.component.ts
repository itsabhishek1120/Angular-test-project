import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalServices } from "./../../global-services";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public global: GlobalServices) { }

  jobId: any;

  ngOnInit(): void {
    // Retrieve the jobId from the route parameters
    this.jobId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log('Job Detail for ID:', this.jobId);
  }

}
