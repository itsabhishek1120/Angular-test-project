import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      graduationYear: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfileData();
    console.log("this.editProfileForm..",this.editProfileForm);

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
      graduationYear: 2020
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
      graduationYear: mockResponse.graduationYear
    });

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

