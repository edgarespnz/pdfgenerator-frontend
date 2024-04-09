// Angular core modules
import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular routing module
import { AppRoutingModule } from './app-routing.module';

//Modules and components
import { AppComponent } from './app.component';

import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';

//angular forms
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoopProductComponent } from './shared/loop-product/loop-product.component';

//angular material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTreeModule} from '@angular/material/tree';

//Angular router
import { RouterModule } from '@angular/router';

//Http client
import { HttpClientModule } from '@angular/common/http';

//PDF generator components and modules
import { PdfgeneratorExportComponent } from './modules/pdf-generator/pdfgenerator-export/pdfgenerator-export.component';
import { PdfgeneratorCreateComponent } from './modules/pdf-generator/pdfgenerator-create/pdfgenerator-create.component';


//Products components (admin)
import { ProductCreateComponent } from './modules/products/product-create/product-create.component';
import { ProductEditComponent } from './modules/products/product-edit/product-edit.component';
import { ProductAllComponent } from './modules/products/product-all/product-all.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    LoopProductComponent,
    NotFoundComponent,
    NavigationBarComponent,
    NavigationBarComponent,

    //PDF generator components
    PdfgeneratorExportComponent,
    PdfgeneratorCreateComponent,

    //Products components (admin)
    ProductCreateComponent,
    ProductEditComponent,
    ProductAllComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatCommonModule,
    RouterModule,
    MatButtonModule,
    CommonModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule
    
  ],
  providers: [
    importProvidersFrom(HttpClientModule)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
