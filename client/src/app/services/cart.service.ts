import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if (cartItem) {
      // Incrémente la quantité
      cartItem.quantity++;
      cartItem.price = +food.price; // Convertit le prix en nombre
    } else {
      // Ajoute un nouvel élément au panier
      const newCartItem = new CartItem(food);
      newCartItem.price = +food.price; // Convertit le prix en nombre
      this.cart.items.push(newCartItem);
    }
    this.setCartToLocalStorage(); // Met à jour le panier dans le stockage local
  }
  
  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items
      .filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();// Met à jour le panier dans le stockage local
  }

  changeQuantity(foodId: number, quantity: number) {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage(); // Met à jour le panier dans le stockage local
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage(); // Réinitialise le panier et met à jour dans le stockage local
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable(); // Retourne un Observable pour surveiller les modifications du panier
  }

  getCart(): Cart{
    return this.cartSubject.value; // Retourne la valeur actuelle du panier
  }

  private setCartToLocalStorage(): void {
        // Calcule le prix total et le nombre total d'articles dans le panier
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);// Convertit le panier en JSON
    localStorage.setItem('Cart', cartJson);// Stocke le panier dans le stockage local
    this.cartSubject.next(this.cart);// Émet une nouvelle valeur du panier via le sujet BehaviorSubject
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');// Récupère le panier depuis le stockage loca
    return cartJson ? JSON.parse(cartJson) : new Cart();// Si le panier existe, le désérialise, sinon, crée un nouveau panier
  }
}