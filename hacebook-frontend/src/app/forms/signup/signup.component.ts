import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authService:AuthService) {}

  @Input() visible: Boolean | undefined;

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

      const request = {
        username: this.signUpForm.value.username,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        password2: this.signUpForm.value.password2
      }

      const response = this.authService.register(request);

      console.log(response);
      return;
    }catch(error){
      console.log(error);
      throw error;
    }
  }

  closeDialog(){
    this.visible = !this.visible;
  }
}
