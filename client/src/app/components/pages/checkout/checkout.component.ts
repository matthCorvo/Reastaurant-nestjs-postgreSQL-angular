import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
// import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  order:Order = new Order();
  checkoutForm!: FormGroup;
  constructor(cartService:CartService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              // private orderService: OrderService,
              // private router: Router
              ) {
                const cart = cartService.getCart();
                this.order.items = cart.items;
                this.order.totalPrice = cart.totalPrice;
              }

  ngOnInit(): void {
    let {name, adresse} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      adresse:[adresse, Validators.required],
    });
    console.log(this.userService.currentUser)
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Veuillez remplir les champs', 'Champs non valides');
      return;
    }

    // if(!this.order.adresseLatLng){
    //   this.toastrService.warning('Veuillez sélectionner votre emplacement sur la carte', 'Emplacement');
    //   return;
    // }

    this.order.name = this.fc.name.value;
    this.order.adresse = this.fc.adresse.value;
    console.log(this.order)
    // this.orderService.create(this.order).subscribe({
    //   next:() => {
    //     this.router.navigateByUrl('/payment');
    //   },
    //   error:(errorResponse) => {
    //     this.toastrService.error(errorResponse.error, 'Cart');
    //   }
    // })
  }
}