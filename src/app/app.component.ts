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
}
