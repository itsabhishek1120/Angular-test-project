import { Component, OnInit } from '@angular/core';
import { GlobalServices } from "./../../global-services";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(public global: GlobalServices) { }

  ngOnInit(): void {
  }

}
