import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalServices } from './../../global-services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public global: GlobalServices) { }

  dropdownOpen = false;

   // Toggle dropdown visibility
   toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu) {
      dropdownMenu.classList.toggle('hidden', !this.dropdownOpen);
    }
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  closeDropdowns(event: MouseEvent): void {
    const dropdownContainer = document.getElementById('dropdownContainer');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const toggleButton = document.getElementById('dropdownToggle');

    // Close dropdown if clicked outside
    if (
      dropdownContainer &&
      dropdownMenu &&
      toggleButton &&
      !dropdownContainer.contains(event.target as Node) &&
      !toggleButton.contains(event.target as Node) &&
      !dropdownMenu.contains(event.target as Node)
    ) {
      this.dropdownOpen = false;
      dropdownMenu.classList.add('hidden');
    }
  }

  logout(): void {
    console.log('Logging out...');
    // Perform actual logout logic here
  }

  ngOnInit(): void {
  }

}
