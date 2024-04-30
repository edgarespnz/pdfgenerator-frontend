import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  registerForm: FormGroup;
  showPassword = false;
  isDisabledButton = false;

  errorMessage = '';
  showErrors = false;

  constructor(
    private router: Router,
    private authService: AuthService
    ) { 
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    })
  }

  register(){
    this.showErrors = true;
    this.errorMessage = '';
    if(this.registerForm.valid){
      this.isDisabledButton = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.isDisabledButton = false;
        },
        error: (err) => {
          if(err.error.message === 'User already exists'){
            this.errorMessage = "El usuario ya existe";
          }else if(err.error.message === 'Passwords do not match'){
            this.errorMessage = "Las contraseñas no coinciden";
          }
          this.registerForm.markAllAsTouched();
          this.isDisabledButton = false;
        }
      });
    }
    this.registerForm.markAllAsTouched();
  }

  login(){
    this.router.navigate(['/login']);
  }
}
