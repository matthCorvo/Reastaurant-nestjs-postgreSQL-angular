import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartItemCount: number; // // Nombre d'articles dans le panier
  cartItems: any[];   // Tableau pour stocker les articles du panier
  cartTotal: number;   // Montant total du panier

  // Initialise les propriétés lorsque le composant est créé
  constructor(private cartService: CartService) {
    // Obtenir le nombre d'articles actuel dans le panier
    this.cartItemCount = this.cartService.getCartItemCount();

    // articles actuels du panier
    this.cartItems = this.cartService.getCartItems();
     // Calculer le montant total du panier
    this.cartTotal = this.cartService.calculateCartTotal(); 
  }

  removeFromCart(index: number) {
    // Obtenir l'article à supprimer du tableau cartItems
    const removedItem = this.cartItems[index];
    
    //  Appeler la méthode du service pour supprimer l'article
    this.cartService.removeFromCart(removedItem);
    
    // Mettre à jour le nombre d'articles dans le panier, les articles du panier
    this.cartItemCount = this.cartService.getCartItemCount();
    this.cartItems = this.cartService.getCartItems();
    this.cartTotal = this.cartService.calculateCartTotal();
  }
  
}
