import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';


import { authGuard } from './guards/auth/auth.guard';
import { ExportComponent } from './modules/pdf-generator/export/export.component';
import { CreateComponent } from './modules/pdf-generator/create/create.component';



const routes: Routes = [
    {path: 'login', title: 'Iniciar Sesión', component: LoginComponent},
    {
      path: 'dashboard', 
      title:'Panel Principal',  
      component: DashboardComponent, 
      canActivate: [authGuard],
      children: [
        {path: 'pdf-generator/export', title: 'Generador de PDF', component: ExportComponent,},
        {path: 'pdf-generator/create', title: 'Generador de PDF', component: CreateComponent}
      ]
    },
    {path: 'register',title: 'Crear una cuenta', component: RegisterComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [BrowserModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent, DashboardComponent, NotFoundComponent, ExportComponent, CreateComponent];
