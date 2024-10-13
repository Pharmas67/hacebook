import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/Interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule,SignupComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private route:ActivatedRoute, private authService:AuthService,private router:Router) {}

  ngOnInit(): void {
    if(this.route.snapshot.queryParamMap.get('message') === 'successfull'){
      this.regVisible = true;
    }
  }

  warning: boolean = false;
  warningMessage: string = '';

  regVisible: boolean = false;
  regMessgae: string = 'Registration was successfull';

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

      const payload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      const response = await this.authService.login(payload);

      if(response === 'The provided credentials are incorrect.'){
        this.warning = true;
        this.warningMessage = 'The provided credentials are incorrect.';
        return;
      }
      console.log(response);
      
      localStorage.setItem('currentUser', JSON.stringify(response));
      //this.router.navigate(['/home']);
      return;

    } catch(error){
      console.log(error);
      throw error;
    }
  } 

  toRegister() {
    this.router.navigate(['/signup']);
  }
}
