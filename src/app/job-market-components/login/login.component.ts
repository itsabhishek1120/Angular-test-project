import { Component, OnInit } from '@angular/core';
import { GlobalServices } from "./../../global-services";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(public global: GlobalServices, private fb: FormBuilder,private router: Router) {
    // Initialize the reactive form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false] // Default value for checkbox
    });
   }

   onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Form Data:', formData);
      let body = {
        email: formData.email,
        password: formData.password
      }

      this.global.post('/login',body).then(resp =>{
        console.log("Data aa gya bc>>>",resp);
        if (!resp?.success) {
          this.global.failAlert(resp.message);
          return;
        } else {
          this.global.successAlert("LogIn Successful");
          this.global.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
        }
      }).catch((error) => {
        console.error('API Error:', error);
      });

    } else {
      console.log("Form is invalid.");
    }
  }

  ngOnInit(): void {
  }

}
