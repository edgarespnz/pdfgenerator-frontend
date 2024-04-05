import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
   {path: 'login', title: 'Iniciar Sesión', component: LoginComponent},
    {path: 'dashboard', title:'Panel Principal',  component: DashboardComponent},
    {path: 'register',title: 'Crear una cuenta', component: RegisterComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [BrowserModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
