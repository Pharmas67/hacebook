import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async register(Obj: Object): Promise<Object> {
    try {
      await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });
      
      const xsrfToken = this.getCookie('XSRF-TOKEN');

      const response = await axios.post('http://localhost/register', Obj, 
        { headers: {"Content-Type": "application/json", "x-xsrf-token": xsrfToken}, withCredentials: true});
      
      return response.data;
      
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

  async login(Obj: Object): Promise<Object> {
    try {
      await axios.get('http://localhost/sanctum/csrf-cookie');

      const response = await axios.post('http://localhost/login', Obj);

      return response.data;
      
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

  async logout(Obj: Object): Promise<void> {
    try {
      await axios.get('http://localhost/sanctum/csrf-cookie');

      const response = await axios.post('http://localhost/logout', Obj);

      return response.data;
      
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

  getCookie(name: string): string | null {
    const cookieArr = document.cookie.split(';'); // Split the cookies by ';'
    
    for (let cookie of cookieArr) {
        let [cookieName, cookieValue] = cookie.split('=');
        
        // Trim spaces and decode the cookie name and value
        cookieName = cookieName.trim();
        
        // If the cookie matches the requested name, return its value
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    
    return null; // Return null if the cookie is not found
  }
}

