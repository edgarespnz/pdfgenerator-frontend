import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/dev.environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API_URL = environment.API_URL;
  constructor( private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.API_URL + '/categories');
  }
}
