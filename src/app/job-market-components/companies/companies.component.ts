import { Component, OnInit } from '@angular/core';
import { GlobalServices } from "./../../global-services";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(public global: GlobalServices) { }

  companies = [
    {
      name: 'Tech Corp',
      logo: 'https://via.placeholder.com/100',
      industry: 'IT & Services',
      openPositions: 15,
      location: 'Mumbai',
    },
    {
      name: 'Fin Bank',
      logo: 'https://via.placeholder.com/100',
      industry: 'Finance',
      openPositions: 20,
      location: 'Bangalore',
    },
    {
      name: 'HealthPlus',
      logo: 'https://via.placeholder.com/100',
      industry: 'Healthcare',
      openPositions: 10,
      location: 'Delhi',
    },
    {
      name: 'Tech Corp',
      logo: 'https://via.placeholder.com/100',
      industry: 'IT & Services',
      openPositions: 15,
      location: 'Mumbai',
    },
    {
      name: 'Fin Bank',
      logo: 'https://via.placeholder.com/100',
      industry: 'Finance',
      openPositions: 20,
      location: 'Bangalore',
    },
    {
      name: 'HealthPlus',
      logo: 'https://via.placeholder.com/100',
      industry: 'Healthcare',
      openPositions: 10,
      location: 'Delhi',
    },
  ];

  ngOnInit(): void {
  }

}
