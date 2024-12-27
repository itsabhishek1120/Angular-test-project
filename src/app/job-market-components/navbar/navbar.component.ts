import { Component, OnInit } from '@angular/core';
import { GlobalServices } from "./../../global-services";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public global: GlobalServices) { }

  ngOnInit(): void {
  }

}
