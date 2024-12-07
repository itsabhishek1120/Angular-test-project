import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs = [
    {
      title: 'Software Engineer',
      company: 'Acme Corp',
      experience: '3-8 Yrs',
      salary: 'Not disclosed',
      location: 'Hyderabad, Pune, Bengaluru',
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      tags: ['Full-time', 'Remote'],
      description: "We are looking for a highly skilled software engineer with experience in developing scalable applications. Strong knowledge of React and Node.js is essential, along with experience in database management.",
      postedDate: 1,
    },
    {
      title: 'Backend Developer',
      company: 'Tech Solutions',
      experience: '2-5 Yrs',
      salary: '₹10-15 LPA',
      location: 'Chennai, Bengaluru',
      skills: ['Node.js', 'PostgreSQL', 'Docker'],
      tags: ['Full-time', 'On-site'],
      description: "Hi, I'm test descriptionnnn !!!",
      postedDate: 2,
    },
    {
      title: 'Frontend Developer',
      company: 'Innovatech',
      experience: '1-3 Yrs',
      salary: '₹8-12 LPA',
      location: 'Delhi, Gurgaon',
      skills: ['Angular', 'Tailwind CSS', 'TypeScript'],
      tags: ['Part-time', 'Hybrid'],
      description: "Yep, I'm test descriptionnnn !!!",
      postedDate: 3,
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Inc.',
      experience: '4-6 Yrs',
      salary: '₹12-18 LPA',
      location: 'Mumbai, Remote',
      skills: ['React', 'Node.js', 'AWS'],
      tags: ['Full-time', 'Remote'],
      description: "Heyy there!! I'm test descriptionnnn !!!",
      postedDate: 4,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
