import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatButtonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule]
})


export class LoginComponent {
   loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
   })


   login(){
      console.log(this.loginForm.value);
   }
}


