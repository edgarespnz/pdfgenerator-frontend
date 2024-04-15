import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, TitleStrategy } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit{
  
  pageMainTitle: string = 'Panel de administrador';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: TitleStrategy
  ) { }


  ngOnInit(): void {
    //todo: rutas dinámicas para el título de la página por ejemplo "Productos > Crear"
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
