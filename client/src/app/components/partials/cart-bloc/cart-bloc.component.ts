import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../shared/models/Cart';
import { CartItem } from '../../../shared/models/CartItem';

@Component({
  selector: 'app-cart-bloc',
  templateUrl: './cart-bloc.component.html',
  styleUrls: ['./cart-bloc.component.css']
})
export class CartBlocComponent implements OnInit {
  cart!: Cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
   }

  ngOnInit(): void {

  }

  // Fonction pour supprimer un élément du panier
  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.id);
  }

  // Fonction pour changer la quantité d'un élément du panier
  changeQuantity(cartItem:CartItem,quantityIn:number){
    const quantity = quantityIn;
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }

  decrementQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      cartItem.price = cartItem.quantity * cartItem.food.price;
      this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity);
    }
  }
  
  incrementQuantity(cartItem: CartItem) {
    cartItem.quantity++;
    cartItem.price = cartItem.quantity * cartItem.food.price;
    this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity);
  }
  
}