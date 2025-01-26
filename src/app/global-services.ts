import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosError } from 'axios';
import { environment } from "../environments/environment";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class GlobalServices {

  constructor(
    private router: Router,
  ){}

  // GLOBAL VARIABLES
  public loginDetails = {
    isLoggedIn : false,
    isEmployer : false,
    userEmail : ''
  };
  public menuOpen = false;
  public isLoading = false;
  public API_URL = environment.apiUrl+'/api';

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

  public successAlert(title = 'Success', message = ' ') {
    Swal.fire({
      title: title,
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
    this.showLoader();
    console.log("Params :",params);
    try {
      const token = localStorage.getItem('token');
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await this.apiClient.get(endpoint, { headers, params, withCredentials: false });
      this.hideLoader();
      return response.data;
    } catch (error: any) {
      console.error('GET Request Error:', error);
      if(error?.response?.data?.message) {
        let errMssg = error?.response?.data?.message;
        if(error?.response?.status == 401){
          this.failAlert('Logging Out!! Session Expired');
          this.logout();
          return;
        }
        this.hideLoader();
        this.failAlert(errMssg);
      }else {
        this.hideLoader();
        this.failAlert("Error While calling API");
      }
    }
  };

  post = async (endpoint: any, body: any, headers = {}) => {
    this.showLoader();
    try {
      const token = localStorage.getItem('token');
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await this.apiClient.post(endpoint, body, {
        headers,
        withCredentials: false, // Include cookies in the request
      });
      console.log("response>>", response.data);
      this.hideLoader();
      return response.data;
    } catch (error: any) {
      console.error('POST Request Error:', error);
      if(error?.response?.data?.message) {
        let errMssg = error?.response?.data?.message;
        if(error?.response?.status == 401){
          this.failAlert('Logging Out!! Session Expired');
          this.logout();
          return;
        }
        this.hideLoader();
        this.failAlert(errMssg);
      }else {
        this.hideLoader();
        this.failAlert("Error While calling API");
      }
    }
  };

  public logout() {
    const body = {
      email: this.loginDetails.userEmail
    }
    this.loginDetails.isLoggedIn = false;
    this.loginDetails.isEmployer = false;
    this.loginDetails.userEmail = '';
    localStorage.removeItem('token');
    localStorage.removeItem('loginDetails');
    this.router.navigate(['/dashboard']);

    this.post('/logout',body).then(resp =>{
      console.log("Logout Response:",resp);
      if (!resp?.success) {
        this.failAlert(resp?.message);
        return;
      } else {
        // this.successAlert("User Logged Out");
      }
    }).catch((error) => {
      console.error('API Error:', error);
    });
  }

  public showLoader() {
    this.isLoading = true;
  }

  public hideLoader() {
    this.isLoading = false;
  }

}



