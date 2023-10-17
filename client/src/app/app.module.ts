import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { CartBlocComponent } from './components/partials/cart-bloc/cart-bloc.component';
import { EmptyComponent } from './components/partials/empty/empty.component';
import { EmptySearchComponent } from './components/partials/empty-search/empty-search.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/pages/register/register.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { AddCartComponent } from './components/partials/add-cart/add-cart.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { FoodListComponent } from './components/partials/food-list/food-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { PayButtonComponent } from './components/partials/pay-button/pay-button.component';
import { OrderTrackPageComponent } from './components/pages/order-track/order-track.component';
import { OrderPayedComponent } from './components/pages/order-payed/order-payed.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    CartBlocComponent,
    EmptyComponent,
    EmptySearchComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    AddCartComponent,
    PaymentComponent,
    TextInputComponent,
    FoodListComponent,
    MapComponent,
    PayButtonComponent,
    OrderTrackPageComponent,
    OrderPayedComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbCollapseModule,
    NgbDropdownModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
