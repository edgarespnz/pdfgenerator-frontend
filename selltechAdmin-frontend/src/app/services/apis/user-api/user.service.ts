import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/dev.environment';
import { User } from 'src/app/interfaces/users/User.interface';
import { UserPutResponse } from 'src/app/interfaces/users/UserPutResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get(this.API_URL + '/user');
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.API_URL + '/users');
  }

  putUser(userId: string, userData: User): Observable<UserPutResponse>{
    return this.http.put<UserPutResponse>(this.API_URL + '/user/' + userId, userData);
  }
}
