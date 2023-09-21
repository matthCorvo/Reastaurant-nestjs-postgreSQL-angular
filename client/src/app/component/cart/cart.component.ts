import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductModelServer } from '../../model/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  // Tableau pour stocker les produits du panier
  cartItems: ProductModelServer[] = [];
  // Compteur pour le nombre total d'articles dans le panie
  cartItemCount: number = 0;
  // Montant total du panier
  cartTotal: number = 0;

  constructor(public cartService: CartService) {}

  ngOnInit() {
    // Au chargement du composant, récupérer les articles du panier, le nombre d'articles et le total
    this.cartItems = this.cartService.getCartItems();
    this.cartItemCount = this.cartService.getCartItemCount();
    this.cartTotal = this.cartService.calculateCartTotal();
  }

  removeFromCart(index: number) {
    // Supprimer l'article à l'index spécifié du tableau cartItems
    this.cartItems.splice(index, 1);
    
    // Mettre à jour le nombre d'articles dans le panier et le total du panier
    this.cartItemCount = this.cartService.getCartItemCount();
    this.cartTotal = this.cartService.calculateCartTotal();
  }
}
