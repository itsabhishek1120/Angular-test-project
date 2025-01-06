import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalServices } from './../../global-services';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;
  profilePictureUrl: string | null = null;  // Default set to null for no image initially

  constructor(private fb: FormBuilder, public global: GlobalServices) {
    this.editProfileForm = this.fb.group({
      currentJobTitle: [''],
      experience: [''],
      currentCompany: [''],
      noticePeriod: [''],
      highestQualification: [''],
      fieldOfStudy: [''],
      instituteName: [''],
      graduationYear: [''],
      skills: [[]],
      portfolio: ['', Validators.pattern('https?://.+')],
      linkedin: ['', Validators.pattern('https?://.+')],
      github: ['', Validators.pattern('https?://.+')],
      otherProfile: ['', Validators.pattern('https?://.+')],
    });
  }

  ngOnInit(): void {
    this.loadProfileData();
    console.log("this.editProfileForm..",this.editProfileForm);

  }

  selectedSkills: string[] = [];
  filteredSkills: string[] = [];
  allSkills: string[] = ['React', 'Node.js', 'MongoDB', 'Express.js', 'Angular', 'Vue.js'];
  isSkillsDropdownVisible: boolean = false; // Toggle dropdown visibility
  jobPostSubmitted: boolean = false; // You can set this flag when form submission happens

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: MouseEvent): void {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(event.target as Node)) {
        // Hide the dropdown based on the element
        if (dropdown.id === 'skills-dropdown') {
          this.isSkillsDropdownVisible = false;
        }
      }
    });
  }

  // Add a skill (called when user presses Enter)
  addSkill(event: Event): void {
    event.preventDefault();
    const inputValue = this.editProfileForm.get('skills')?.value.trim();
    if (inputValue && !this.selectedSkills.includes(inputValue)) {
      this.selectedSkills.push(inputValue);
      this.editProfileForm.get('skills')?.setValue('');
      this.filteredSkills = [];
    }
  }

  // Remove selected skill
  removeSkill(index: number): void {
    this.selectedSkills.splice(index, 1);
  }

  // Filter available skills based on user input
  filterSkills(): void {
    const query = this.editProfileForm.get('skills')?.value.toLowerCase();
    this.filteredSkills = this.allSkills.filter(skill =>
      skill.toLowerCase().includes(query) && !this.selectedSkills.includes(skill)
    );
    this.isSkillsDropdownVisible = this.filteredSkills.length > 0;
  }

  // Select skill from dropdown
  selectSkill(skill: string): void {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
      this.editProfileForm.get('skills')?.setValue('');
      this.filteredSkills = [];
    }
  }

  // Toggle dropdown visibility when input field is focused
  toggleSkillsDropdown(): void {
    this.isSkillsDropdownVisible = this.filteredSkills.length > 0;
  }

  loadProfileData(): void {
    // Custom response for now, replace with API call later
    const mockResponse = {
      currentJobTitle: 'Software Developer',
      experience: 3,
      currentCompany: 'TechCorp',
      noticePeriod: 30,
      profilePicture: '', // Replace with actual profile picture URL if available
      highestQualification: '',
      fieldOfStudy: 'Computer Science',
      instituteName: 'Tech University',
      graduationYear: 2020,
      skills: ['Node.js', 'Angular', 'React'],
      portfolio: 'https://your-portfolio-example.com',
      linkedin: 'https://www.linkedin.com/in/example-profile/',
      github: 'https://github.com/example-profile',
      otherProfile: 'https://www.leetcode.com/in/example-profile/',
    };

    // Patch form values
    this.editProfileForm.patchValue({
      currentJobTitle: mockResponse.currentJobTitle,
      experience: mockResponse.experience,
      currentCompany: mockResponse.currentCompany,
      noticePeriod: mockResponse.noticePeriod,
      highestQualification: mockResponse.highestQualification || '',
      fieldOfStudy: mockResponse.fieldOfStudy,
      instituteName: mockResponse.instituteName,
      graduationYear: mockResponse.graduationYear,
      portfolio: mockResponse.portfolio,
      linkedin: mockResponse.linkedin,
      github: mockResponse.github,
      otherProfile: mockResponse.otherProfile,
    });

    this.selectedSkills = mockResponse.skills.slice();
    this.editProfileForm.controls['skills'].setValue(this.selectedSkills);
    this.editProfileForm.get('skills')?.setValue('');

    // Set the profile picture URL
    // If profilePicture is null or undefined in the response, fallback to placeholder image
    // this.profilePictureUrl = mockResponse.profilePicture || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp';
  }

  uploadProfilePhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // Check if the file type is an image (jpg, jpeg, png)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validImageTypes.includes(file.type)) {
      this.global.failAlert('Please upload a valid image file (JPEG, PNG, JPG)');
      return;
    }
      const reader = new FileReader();

      reader.onload = () => {
        this.profilePictureUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  removeProfilePhoto(): void {
    this.profilePictureUrl = null;
  }

  submitProfile(): void {
    console.log('Form submitted:', this.editProfileForm.value);
    console.log('Profile picture:', this.profilePictureUrl);
  }

}

