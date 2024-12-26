import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalServices } from "./../../global-services";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  jobPostForm: FormGroup;
  jobPostSubmitted = false;


  constructor(public global: GlobalServices, private fb: FormBuilder, private router: Router) {

    this.jobPostForm = this.fb.group({
      title: ['', Validators.required],
      // company: ['', Validators.required],
      experience: ['', Validators.required],
      salaryFrom: ['', Validators.required],
      salaryTo: ['', Validators.required],
      location: [[]],
      skills: [[]],
      tags: [[]],
      description: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }

  // Flags to control dropdown visibility
  isLocationDropdownVisible: boolean = false;
  isSkillsDropdownVisible: boolean = false;
  isTagsDropdownVisible: boolean = false;
  // Listen for clicks outside the dropdowns to close them
  @HostListener('document:click', ['$event'])
  closeDropdowns(event: MouseEvent): void {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(event.target as Node)) {
        // Hide the dropdown based on the element
        if (dropdown.id === 'location-dropdown') {
          this.isLocationDropdownVisible = false;
        } else if (dropdown.id === 'skills-dropdown') {
          this.isSkillsDropdownVisible = false;
        } else if (dropdown.id === 'tags-dropdown') {
          this.isTagsDropdownVisible = false;
        }
      }
    });
  }
  // Toggle visibility of the location dropdown
  toggleLocationDropdown() {
    this.isLocationDropdownVisible = !this.isLocationDropdownVisible;
  }

  // Toggle visibility of the skills dropdown
  toggleSkillsDropdown() {
    this.isSkillsDropdownVisible = !this.isSkillsDropdownVisible;
  }

  // Toggle visibility of the tags dropdown
  toggleTagsDropdown() {
    this.isTagsDropdownVisible = !this.isTagsDropdownVisible;
  }

  // Getter for easy access to form controls in the template
  get jobPostControls() { return this.jobPostForm.controls; }


  //--------------------- Job Title ---------------------
  jobTitles: string[] = ['Software Engineer', 'Data Scientist', 'Product Manager', 'Designer', 'Full Stack Developer', 'DevOps Engineer'];

  //--------------------- Experience ---------------------
  experienceOptions: number[] = [...Array(10).keys()];

  //--------------------- Salary ---------------------
  salaryFromOptions: number[] = [...Array(31).keys()];
  salaryToOptions: number[] = [...Array(30).keys()].map(i => i + 1);


  //--------------------- Location ---------------------
  selectedLocations: string[] = [];
  filteredLocations: string[] = [];
  allLocations: string[] = ['Hyderabad', 'Pune', 'Bengaluru', 'Mumbai', 'Chennai'];

  addLocation(event: Event): void {
    event.preventDefault();

    const inputValue = this.jobPostForm.get('location')?.value.trim();
    if (inputValue && !this.selectedLocations.includes(inputValue)) {
      this.selectedLocations.push(inputValue);
      this.jobPostForm.get('location')?.setValue('');
      this.filteredLocations = [];
    }
    // console.log("addLocation",this.selectedLocations);
  }
  removeLocation(index: number): void {

    this.selectedLocations.splice(index, 1);
    // console.log("removeLocation",this.selectedLocations);
  }
  filterLocations(): void {
    const query = this.jobPostForm.get('location')?.value.toLowerCase();
    this.filteredLocations = this.allLocations.filter(location =>
      location.toLowerCase().includes(query) && !this.selectedLocations.includes(location)
      );
      this.isLocationDropdownVisible = this.filteredLocations.length > 0;
    // console.log("filterLocations",this.selectedLocations);
  }
  selectLocation(location: string): void {

    if (!this.selectedLocations.includes(location)) {
      this.selectedLocations.push(location);
      this.jobPostForm.get('location')?.setValue('');
      this.filteredLocations = [];
    }
    // console.log("selectLocation",this.selectedLocations);
  }

  //--------------------- Skills ---------------------
  selectedSkills: string[] = [];
  filteredSkills: string[] = [];
  allSkills: string[] = ['React', 'Node.js', 'MongoDB', 'Express.js', 'Angular', 'Vue.js'];

  addSkill(event: Event): void {
    event.preventDefault();
    const inputValue = this.jobPostForm.get('skills')?.value.trim();
    if (inputValue && !this.selectedSkills.includes(inputValue)) {
      this.selectedSkills.push(inputValue);
      this.jobPostForm.get('skills')?.setValue('');
      this.filteredSkills = [];
    }
  }
  removeSkill(index: number): void {
    this.selectedSkills.splice(index, 1);
  }
  filterSkills(): void {
    const query = this.jobPostForm.get('skills')?.value.toLowerCase();
    this.filteredSkills = this.allSkills.filter(skill =>
      skill.toLowerCase().includes(query) && !this.selectedSkills.includes(skill)
    );
  }
  selectSkill(skill: string): void {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
      this.jobPostForm.get('skills')?.setValue('');
      this.filteredSkills = [];
    }
  }


  //--------------------- Tags ---------------------
  selectedTags: string[] = [];
  filteredTags: string[] = [];
  allTags: string[] = ['Full-time', 'Remote', 'Part-time', 'Contract', 'Internship']; // Sample options

  addTag(event: Event): void {
    event.preventDefault();
    const inputValue = this.jobPostForm.get('tags')?.value.trim();
    if (inputValue && !this.selectedTags.includes(inputValue)) {
      this.selectedTags.push(inputValue);
      this.jobPostForm.get('tags')?.setValue('');
      this.filteredTags = [];
    }
  }
  removeTag(index: number): void {
    this.selectedTags.splice(index, 1);
  }
  filterTags(): void {
    const query = this.jobPostForm.get('tags')?.value.toLowerCase();
    this.filteredTags = this.allTags.filter(tag =>
      tag.toLowerCase().includes(query) && !this.selectedTags.includes(tag)
    );
  }
  selectTag(tag: string): void {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
      this.jobPostForm.get('tags')?.setValue('');
      this.filteredTags = [];
    }
  }


  createJobPost(): void {
    console.log("Locations>>",this.selectedLocations);
    console.log("Skills>>",this.selectedSkills);
    console.log("Tags>>",this.selectedTags);

    this.jobPostSubmitted = true;

    if (this.jobPostForm.invalid) {
      console.log('Invalid Form :', this.jobPostForm.value);
      // this.global.failAlert("Invalid Form");
      return;
    }

    // Gather form data
    const jobPostData = this.jobPostForm.value;
    console.log('Job Post Form Data:', jobPostData);

    const body = {
      title: jobPostData.title,
      company_mail: this.global.loginDetails.userEmail,
      experience: jobPostData.experience,
      salary_from: jobPostData.salaryFrom,
      salary_to: jobPostData.salaryTo,
      location: this.selectedLocations,
      skills: this.selectedSkills,
      tags: this.selectedTags,
      description: jobPostData.description
    }
    console.log("create Job body :",body);

    if(body.company_mail == ''){
      this.global.failAlert("User Email Error");
      return;
    }

    this.global.post('/create-job-post', body).then((resp: any) => {
      console.log('Job Post Response:', resp);
      if (!resp?.success) {
        console.log('Error:', resp.message);
        this.global.failAlert(resp.message);
        return;
      } else {
        this.global.successAlert("Job Post Created Successfully");
        // this.router.navigate(['/dashboard']);
      }
    }).catch((error) => {
      console.error('API Error:', error);
      this.global.failAlert("Error Posting Job");
    });
  }

}
