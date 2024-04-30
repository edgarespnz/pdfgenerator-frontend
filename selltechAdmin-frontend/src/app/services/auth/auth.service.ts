import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from 'src/app/environments/dev.environment';
import { LoginResponse } from 'src/app/interfaces/login/LoginResponse.interface';
import { UserLogin } from 'src/app/interfaces/login/userLogin.interface';
import { UserRegister } from 'src/app/interfaces/userRegister.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.API_URL; 

  constructor(private http: HttpClient) { }

  login(user: UserLogin){
    return this.http.post<LoginResponse>(this.API_URL + '/login', user);
  }

  register(newUser: UserRegister){
    return this.http.post(this.API_URL + '/register', newUser);
  }

  verifyToken(token: string): Observable<boolean>{
    return this.http.post<boolean>(this.API_URL + '/verify-token', {token})
  }

}
