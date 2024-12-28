import { Component } from '@angular/core';
import { GlobalServices } from "./global-services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ang-test-project';
  constructor(public global: GlobalServices) {}

  ngOnInit() {
    const savedLoginDetails = localStorage.getItem('loginDetails');
    if (savedLoginDetails) {
      const loginDetails = JSON.parse(savedLoginDetails);

      //Verify token
      this.global.get('/verify-token').then(resp => {
        if (resp?.success) {
          this.global.loginDetails = loginDetails;
        } else {
          this.global.logout();
        }
      }).catch(() => {
        this.global.logout();
      });
    }
  }

}
