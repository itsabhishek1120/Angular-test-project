import { Component, OnInit } from '@angular/core';
import { GlobalServices } from "./../../global-services";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(public global: GlobalServices, private fb: FormBuilder) {
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
      let params = {
        email: formData.email,
        password: formData.password
      }

      this.global.get('/get-user',params).then(resp =>{
        console.log("Data aa gya bc>>>",resp.data[0]);
        if (!resp.data.length) {
          this.global.failAlert(resp.message);
          return;
        } else {
          this.global.successAlert(JSON.stringify(resp.data[0]));
        }
      }).catch((error) => {
        console.error('API Error:', error);
      });

    } else {
      this.global.failAlert("Form is invalid.");
    }
  }

  ngOnInit(): void {
  }

}
