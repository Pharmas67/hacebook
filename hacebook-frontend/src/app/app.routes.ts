import { Routes } from '@angular/router';
import { LoginComponent } from './forms/login/login.component';
import { SignupComponent } from './forms/signup/signup.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        title: 'Hacebook - Login'
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Hacebook - Register'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Hacebook - Home'
    }
];
