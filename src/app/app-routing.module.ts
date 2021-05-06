import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewProductComponent } from './new-product/new-product.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login-page', component: LoginComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'new-product', component: NewProductComponent },
  { path: 'sales', component: SalesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }