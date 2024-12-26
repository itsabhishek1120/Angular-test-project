import { Component, OnInit } from '@angular/core';
import { GlobalServices } from "./../../global-services";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


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


  constructor(public global: GlobalServices, private fb: FormBuilder, private router: Router) {

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
    },
    { validators: passwordMatchValidator });

    // Initialize the employer form with validation
    this.employerForm = this.fb.group({
      employer_name: ['', Validators.required],
      employer_contact: ['', Validators.required],
      employer_address: ['', Validators.required],
      employer_email: ['', [Validators.required, Validators.email]],
      employer_password: ['', Validators.required],
      employer_confirmPassword: ['', Validators.required],
      employer_terms: [false, Validators.requiredTrue]
    },
    { validators: passwordMatchValidator });
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

    this.global.post('/signup-user', employeeData).then((resp: any) => {
      console.log('Signup user response:', resp);
      if (!resp?.success) {
         console.log('Error:',resp.message);
        this.global.failAlert(resp.message);
        return;
      } else {
        this.global.successAlert("SignUp Successful");
        this.global.loginDetails.isLoggedIn = true;
        this.global.loginDetails.userEmail = employeeData.email;
        this.router.navigate(['/dashboard']);
      }
    }).catch((error) => {
      console.error('API Error:', error);
    });

  }

  createEmployer(): void {
    this.employerSubmitted = true;

    if (this.employerForm.invalid) {
      return;
    }

    // Gather form data
    const employerData = this.employerForm.value;
    console.log('Employer Form Data:', employerData);

    this.global.post('/signup-employer', employerData).then((resp: any) => {
      console.log('Signup Employer response:', resp);
      if (!resp?.success) {
         console.log('Error:',resp.message);
        this.global.failAlert(resp.message);
        return;
      } else {
        this.global.successAlert("SignUp Successful");
        this.global.loginDetails.isLoggedIn = true;
        this.global.loginDetails.isEmployer = true;
        this.global.loginDetails.userEmail = employerData.employer_email;
        this.router.navigate(['/dashboard']);
      }
    }).catch((error) => {
      console.error('API Error:', error);
    });
  }

}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value || control.get('employer_password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value || control.get('employer_confirmPassword')?.value;
  if (!password || !confirmPassword) {
    return null;
  }
  return password === confirmPassword ? null : { passwordMismatch: true };
};
