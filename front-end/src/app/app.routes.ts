import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { RegisterComponent } from './register/register.component';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detail/:id/:itemId', component: DetailComponent }
];
