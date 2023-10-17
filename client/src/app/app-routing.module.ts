import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { OrderTrackPageComponent } from './components/pages/order-track/order-track.component';
import { OrderPayedComponent } from './components/pages/order-payed/order-payed.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'search/:searchTerm', component: HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'food/:id', component: HomeComponent },
  { path:'register', component: RegisterComponent },
  { path:'checkout', component: CheckoutComponent, canActivate:[AuthGuard]},
  { path:'payment', component: PaymentComponent, canActivate:[AuthGuard]},
  { path:'track/:orderId', component: OrderTrackPageComponent, canActivate:[AuthGuard]},
  { path:'orders', component: OrderPayedComponent, canActivate:[AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
