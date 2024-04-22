import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';


import { authGuard } from './guards/auth/auth.guard';
import { ProductCreateComponent } from './modules/products/product-create/product-create.component';
import { ProductEditComponent } from './modules/products/product-edit/product-edit.component';
import { ProductAllComponent } from './modules/products/product-all/product-all.component';



export const routes: Routes = [
    {path: 'login', title: 'Iniciar Sesión', component: LoginComponent},
    {path: 'admin/dashboard', title: 'Productos',component: DashboardComponent,canActivate: [authGuard],children: [
        {path: 'products/create', title: 'Crear un nuevo producto', component: ProductCreateComponent},
        {path: 'products/edit', title: 'Editar un producto', component: ProductEditComponent},
        {path: 'products/all', title: 'Todos los productos', component: ProductAllComponent}
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

export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  DashboardComponent,
  NotFoundComponent,
  ProductCreateComponent,
  ProductEditComponent,
];
