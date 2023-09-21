import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartModelServer } from '../../model/cart.model';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ProductModelServer } from 'src/app/model/product.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  cartItems: ProductModelServer[] = [];
  cartTotal: number = 0;
  checkoutForm: any;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
        this.cartTotal = this.cartService.calculateCartTotal();
  }

  onCheckout(id:number) {
    this.cartService.CheckoutFromCart(id);
  }
  
 
}
