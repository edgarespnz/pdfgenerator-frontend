import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/interfaces/login/LoginResponse.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit{

   loginForm: FormGroup;
   showPassword = false;
   disabledButton = false;
   showErrors=false;
   errorMessage = '';

   constructor(
      private router: Router,
      private authService: AuthService
   ) { 
      this.loginForm = new FormGroup({
         email: new FormControl('', [Validators.required, Validators.email]),
         password: new FormControl('', Validators.required),
        })   
   }

   ngOnInit(): void {
      const token = localStorage.getItem('token');
      if(token){
         this.router.navigate(['/admin']);
      }
   }

   login(){
      this.errorMessage = '';
      if(this.loginForm.valid){
         this.disabledButton = true;
         this.authService.login(this.loginForm.value).subscribe({
            next: (response: LoginResponse) => {
               localStorage.setItem('token', response.token.token);
               localStorage.setItem('user', response.userInfo.username);
               localStorage.setItem('email', response.userInfo.email);
               localStorage.setItem('userId', response.userInfo.userId.toString());
               this.router.navigate(['/admin']);
               this.disabledButton = false;
            },
            error: (err) => {
               this.showErrors = true;
               this.disabledButton = false;
               if(err.error.message === 'Invalid email'){
                  this.errorMessage = 'Email no encontrado';
               } else if(err.error.message === 'Invalid password'){
                  this.errorMessage = 'Contraseña incorrecta';
               }
               else{
                  this.errorMessage = 'Error en el servidor, por favor intente de nuevo';
               }
            }
         });
      }
      this.showErrors = true;
      this.loginForm.markAllAsTouched();
   }

}

