import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule,SignupComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor() {}

  warning: boolean = false;
  warningMessage: string = '';

  signupVisible: Boolean = false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  async login() {
    try {
      if(this.loginForm.value.email === '' || this.loginForm.value.password === ''){
        this.warning = true;
        this.warningMessage = 'Please enter your Login-Data';
      }

      if(this.loginForm.value.email === '' || this.loginForm.value.password === ''){
        this.warning = true;
        this.warningMessage = 'Please enter your Login-Data';
      }

    } catch(error){
      console.log(error);
      throw error;
    }
  } 

  openSignupDialog() {
    console.log("test");
    this.signupVisible = !this.signupVisible;
    console.log(this.signupVisible);
    
  }
}
