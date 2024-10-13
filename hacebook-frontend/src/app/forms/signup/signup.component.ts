import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authService:AuthService, private route:Router) {}

  warning: boolean = false;
  warningMessage: string = '';

  signUpForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl('')
  })

  async signUp(){
    console.log('tt');
    
    try{
      if(this.signUpForm.value.username === '' || this.signUpForm.value.email === '' ||
         this.signUpForm.value.password === '' || this.signUpForm.value.password2 === ''){
          
          this.warning = true;
          this.warningMessage = 'Please fill out all fields';
          return;
      }

      if(this.signUpForm.value.password !== this.signUpForm.value.password2){
        
        this.warning = true;
        this.warningMessage = 'Your Passwords arent the same';
        return;
      }

      if(this.signUpForm.value.password!.length < 2){
        this.warning = true;
        this.warningMessage = 'The Password must be at least 2 long';
        return;
      }

      const request = {
        name: this.signUpForm.value.username,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      }

      const response = await this.authService.register(request);

      if(response === 'successful'){
        this.route.navigate(['/'], {queryParams: {"message": "successfull"}});
      }

      console.log(response);
      
      this.warning = true;
      this.warningMessage = response.toString();
      return;
    }catch(error){
      console.log(error);
      throw error;
    }
  }
}
