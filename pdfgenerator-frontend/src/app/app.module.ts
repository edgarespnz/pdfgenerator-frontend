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
import { HeaderComponent } from './shared/headers/header/header.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { AdminHeaderComponent } from './shared/headers/admin-header/admin-header.component';

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
import { MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

//Angular router
import { RouterModule } from '@angular/router';

//Http client
import { HttpClientModule } from '@angular/common/http';


//Products components (admin)
import { ProductCreateComponent } from './modules/products/product-create/product-create.component';
import { ProductEditComponent } from './modules/products/product-edit/product-edit.component';
import { ProductAllComponent } from './modules/products/product-all/product-all.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EditProductDialogComponent } from './shared/components/product/edit-product-dialog/edit-product-dialog.component';
import { CreateProductDialogComponent } from './shared/components/product/create-product-dialog/create-product-dialog.component';

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
    AdminHeaderComponent,

    //Products components (admin)
    ProductCreateComponent,
    ProductEditComponent,
    ProductAllComponent,
    AdminHeaderComponent,
    EditProductDialogComponent,
    CreateProductDialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
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
    MatTreeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonToggleModule
    
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
