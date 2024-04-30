import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, TitleStrategy } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent{
  
  pageMainTitle: string = 'Panel de administrador';
  username: string = localStorage.getItem('user') ?? '';

  constructor(
    private router: Router,
  ) { 
    console.log(this.username);
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
