import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})



export class LoginComponent {

   loginForm: FormGroup;
   showPassword = false;

   constructor(private router: Router) { 
      this.loginForm = new FormGroup({
         email: new FormControl(''),
         password: new FormControl(''),
        })
   
   }

   login(){
      console.log(this.loginForm.value);
      this.router.navigate(['/dashboard']);
   }

   register(){
      console.log(this.loginForm.value);
      this.router.navigate(['/register']);
   }
}


