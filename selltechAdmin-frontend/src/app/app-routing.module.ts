import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';


import { authGuard } from './guards/auth/auth.guard';
import { ProductCreateComponent } from './modules/products/product-create/product-create.component';
import { ProductEditComponent } from './modules/products/product-edit/product-edit.component';
import { ProductAllComponent } from './modules/products/product-all/product-all.component';
import { GeneratedFilesAllComponent } from './modules/generated-files/generated-files-all/generated-files-all.component';
import { UsersComponent } from './modules/suscriptions/users/users.component';
import { SettingsComponent } from './modules/suscriptions/settings/settings.component';
import { BenefitsComponent } from './modules/suscriptions/benefits/benefits.component';
import { PrizesComponent } from './modules/suscriptions/prizes/prizes.component';



export const routes: Routes = [
    {path: 'login', title: 'Iniciar Sesión', component: LoginComponent},
    {path: 'admin', title: 'Productos',component: DashboardComponent,canActivate: [authGuard],children: [
        {path: 'products/create', title: 'Crear un nuevo producto', component: ProductCreateComponent},
        {path: 'products/edit', title: 'Editar un producto', component: ProductEditComponent},
        {path: 'products/all', title: 'Todos los productos', component: ProductAllComponent}
      ]
    },
    {path: 'admin', title: 'Archivos Generados', component: DashboardComponent, canActivate: [authGuard], children: [
        {path: 'generated-files', title: 'Archivos Generados', component: GeneratedFilesAllComponent}
    ]},
    {
      path: 'admin/subscriptions', title: 'Suscripciones', component: DashboardComponent, canActivate: [authGuard], children: [
        {path: 'users/all', title: 'Todos los usuarios', component: UsersComponent},
        {path: 'prizes', title: 'Premios', component: PrizesComponent},
        {path: 'benefits', title: 'Beneficios', component: BenefitsComponent},
        {path: 'settings', title: 'Configuración', component: SettingsComponent}
      ]
    },
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
  DashboardComponent,
  NotFoundComponent,
  ProductCreateComponent,
  ProductEditComponent,
];
