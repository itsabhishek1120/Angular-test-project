import { Component, OnInit } from '@angular/core';
import { GlobalServices } from "./../../global-services";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  isEmployee : boolean = true;

  employeeForm: FormGroup;
  employerForm: FormGroup;
  employeeSubmitted = false;
  employerSubmitted = false;


  constructor(public global: GlobalServices, private fb: FormBuilder) {

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });

    // Initialize the employer form with validation
    this.employerForm = this.fb.group({
      employer_name: ['', Validators.required],
      employer_contact: ['', Validators.required],
      employer_address: ['', Validators.required],
      employer_email: ['', [Validators.required, Validators.email]],
      employer_password: ['', Validators.required],
      employer_confirmPassword: ['', Validators.required],
      employer_terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
  }

   // Getter for easy access to form controls in the template
   get employeeControls() { return this.employeeForm.controls; }
   get employerControls() { return this.employerForm.controls; }

   toggleForm(isEmployee: boolean): void {
    console.log('isEmployee>>',isEmployee);

    this.isEmployee = isEmployee;
    this.resetForm(); // Reset the form when switching
  }

  resetForm(): void {
    if (!this.isEmployee) {
      this.employeeForm.reset();
      this.employeeSubmitted = false;
    } else {
      this.employerForm.reset();
      this.employerSubmitted = false;
    }
  }

  createEmployee(): void {
    this.employeeSubmitted = true;

    if (this.employeeForm.invalid) {
      return;
    }

    // Gather form data
    const employeeData = this.employeeForm.value;
    console.log('Employee Form Data:', employeeData);

    // Handle the data (e.g., API call)
    // Example:
    // this.authService.registerEmployee(employeeData).subscribe(response => {
    //   console.log(response);
    // });
  }

  createEmployer(): void {
    this.employerSubmitted = true;

    if (this.employerForm.invalid) {
      return;
    }

    // Gather form data
    const employerData = this.employerForm.value;
    console.log('Employer Form Data:', employerData);

    // Handle the data (e.g., API call)
    // Example:
    // this.authService.registerEmployer(employerData).subscribe(response => {
    //   console.log(response);
    // });
  }

}
