import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DetailComponent } from './components/detail/detail.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentAddComponent } from './components/rental/rent-add/rent-add.component';
import { RentalComponent } from './components/rental/rental.component';
import { AlreadyLoginGuard } from './guards/already-login.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/detail/:id",component:DetailComponent},
  {path:"cars/rental",component:RentalComponent},
  {path:"cars/rent-add/:rentcarid",component:RentAddComponent},
  {path:"cars/payment/:rentcarid",component:PaymentComponent},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"cars/brands/add",component:BrandAddComponent},
  {path:"cars/colors/add",component:ColorAddComponent},
  {path:"cars/update/:id",component:CarUpdateComponent},
  {path:"login",component:LoginComponent,canActivate:[AlreadyLoginGuard]},
  {path:"register",component:RegisterComponent,canActivate:[AlreadyLoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
