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
      id: 1,
      name: 'Tech Corp',
      logo: 'https://via.placeholder.com/100',
      industry: 'IT & Services',
      openPositions: 15,
      location: 'Mumbai',
      establishYear : 2007,
    },
    {
      id: 2,
      name: 'Fin Bank',
      logo: 'https://via.placeholder.com/100',
      industry: 'Finance',
      openPositions: 20,
      location: 'Bangalore',
      establishYear : 2010,
    },
    {
      id: 3,
      name: 'HealthPlus',
      logo: 'https://via.placeholder.com/100',
      industry: 'Healthcare',
      openPositions: 10,
      location: 'Delhi',
      establishYear : 2000,
    },
    {
      id: 4,
      name: 'Tech Corp',
      logo: 'https://via.placeholder.com/100',
      industry: 'IT & Services',
      openPositions: 15,
      location: 'Mumbai',
      establishYear : 2008,
    },
    {
      id: 5,
      name: 'Fin Bank',
      logo: 'https://via.placeholder.com/100',
      industry: 'Finance',
      openPositions: 20,
      location: 'Bangalore',
      establishYear : 2002,
    },
    {
      id: 6,
      name: 'HealthPlus',
      logo: 'https://via.placeholder.com/100',
      industry: 'Healthcare',
      openPositions: 10,
      location: 'Delhi',
      establishYear : 2005,
    },
  ];

  ngOnInit(): void {
  }

}
