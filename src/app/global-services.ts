import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class GlobalServices {

  constructor(
    // public http: HttpClient,
  ){}

  // GLOBAL VARIABLES
  public menuOpen = false;
  public API_URL = 'http://localhost:5000/api';

  public apiClient = axios.create({
    baseURL: this.API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });


  //GLOBAL FUNCTION
  public toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  public successAlert(message = '') {
    Swal.fire({
      title: 'Success',
      text: message,
      icon: 'success',
      // position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
  }

  public failAlert(message = '') {
    Swal.fire({
      title: 'Failed',
      text: message,
      icon: 'error',
      // position: 'top-end',
      showConfirmButton: true,
      // timer: 3000
    });
  }

  public get = async (endpoint: any, params = {}, headers = {}) => {
    console.log("Params :",params);
    try {
      const response = await this.apiClient.get(endpoint, { headers, params });
      return response.data;
    } catch (error) {
      console.error('GET Request Error:', error);
      this.failAlert("Error While calling API");
    }
  };

  post = async (endpoint: any, body: any, headers = {}) => {
    try {
      const response = await this.apiClient.post(endpoint, body, { headers });
      return response.data;
    } catch (error) {
      console.error('POST Request Error:', error);
      this.failAlert("Error While calling API");
    }
  };
}



