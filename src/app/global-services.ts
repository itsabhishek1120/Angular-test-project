import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class GlobalServices {

  menuOpen = false;

  apiUrl = 'http://localhost:5000/api';

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}



