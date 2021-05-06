import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';  
import { DemoMaterialModule } from '../app/material-module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

const matmodules = [
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatTableModule,
  DemoMaterialModule
];

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewProductComponent } from './new-product/new-product.component';
import { SalesComponent } from './sales/sales.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    HomePageComponent,
    NewProductComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    matmodules,
    NgxSpinnerModule,
    CommonModule,
    ToastrModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }