import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async register(Obj: Object): Promise<String> {
    try {
      await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true });
      
      const response = await axios.post('http://localhost/api/register', Obj, 
        { headers: {"Content-Type": "application/json"}, withCredentials: true });
      
      return response.data.data;
      
    } catch(error) {
      if(axios.isAxiosError(error)){
        if(error.response && error.response.data){
          return error.response.data.message;
        }
      }
      throw error;
    }
  }

  async login(Obj: Object): Promise<Object> {
    try {
      await axios.get('http://localhost/sanctum/csrf-cookie', {withCredentials: true});

      const response = await axios.post('http://localhost/api/login', Obj,{withCredentials: true});

      return response.data.user;
      
    } catch(error) {
      if(axios.isAxiosError(error)){
        if(error.response && error.response.data){
          return error.response.data.message;
        }
      }
      throw error;
    }
  }

  async logout(Obj: Object): Promise<void> {
    try {
      await axios.get('http://localhost/sanctum/csrf-cookie');

      const response = await axios.post('http://localhost/logout', Obj);

      return response.data;
      
    } catch(error) {
      if(axios.isAxiosError(error)){
        if(error.response && error.response.data){
          return error.response.data.message;
        }
      }
      throw error;
    }
  }

  async createUserToken(Obj: Object): Promise<Object> {
    try {
      await axios.get('http://localhost/sanctum/csrf-cookie', {withCredentials: true});

      const response = await axios.post('http://localhost/api/tokens/createUserToken', Obj,{withCredentials: true});

      return response.data.token;
      
    } catch(error) {
      if(axios.isAxiosError(error)){
        if(error.response && error.response.data){
          return error.response.data.message;
        }
      }
      throw error;
    }
  }
}
