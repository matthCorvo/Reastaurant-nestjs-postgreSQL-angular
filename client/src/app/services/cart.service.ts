import { Injectable } from '@angular/core';
import { ProductModelServer } from '../model/product.model';
import { CartModelServer } from '../model/cart.model';
import { NavigationExtras, Router } from '@angular/router';
import { OrderService } from './order.service'; // Make sure to import your OrderService

interface OrderConfirmationResponse {
  order_id: number;
  success: boolean;
  message: string;
  products: {
    id: string;
    numInCart: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartDataClient: ProductModelServer[] = [];

   /**
   * Constructeur du service CartService.
   * @param router Le routeur pour la navigation.
   * @param orderService Le service de commande pour la gestion des commandes.
   */
  constructor(
    private router: Router, // Add this line
    private orderService: OrderService // Add this line
  ) {
    this.loadCartData();
  }
  
  /**
   * Ajoute un produit au panier côté client.
   * @param product Le produit à ajouter.
   */
  addToCart(product: ProductModelServer) {
    this.cartDataClient.push(product);
    this.saveCartData();
  }

  /**
   * Récupère le nombre d'articles dans le panier.
   * @returns Le nombre d'articles dans le panier.
   */
  getCartItemCount(): number {
    return this.cartDataClient.length;
  }

  /**
   * Calcule le coût total du panier.
   * @returns Le coût total du panier.
   */
  calculateCartTotal(): number {
  let total = 0;

  for (const cartItem of this.cartDataClient) {
  total += cartItem.price * (cartItem.numInCart || 0);
  }

  return total;
}

  /**
   * Supprime un produit du panier.
   * @param product Le produit à supprimer.
   */
  removeFromCart(product: ProductModelServer) {
    const index = this.cartDataClient.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.cartDataClient.splice(index, 1);
      this.saveCartData();
    }
  }

  /**
   * Récupère les articles actuels dans le panier.
   * @returns Les articles actuels dans le panier.
   */
  getCartItems(): ProductModelServer[] {
    return this.cartDataClient;
  }

   /**
   * Efface le contenu du panier.
   */
  clearCart() {
    this.cartDataClient = [];
    this.saveCartData();
  }

  /**
   * Charge les données du panier depuis le stockage local.
   */
  private loadCartData() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartDataClient = JSON.parse(cartData);
    }
  }

  /**
   * Sauvegarde les données du panier dans le stockage local.
   */
  private saveCartData() {
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
  }
  
  /**
   * Finalise la commande à partir du panier.
   * @param userId L'identifiant de l'utilisateur.
   */
  CheckoutFromCart(userId: number): void {
    console.log('CheckoutFromCart function called');

    const cartData: CartModelServer = {
      total: this.calculateCartTotal(),
      data: this.cartDataClient.map(item => ({
        product: item,
        numInCart: item.numInCart || 0 // Provide a default value of 0 if numInCart is undefined
      }))
    };
  
    this.orderService.getSingleOrder(userId).subscribe(
      (data) => {
        if (data.length > 0) {
          const navigationExtras: NavigationExtras = {
            state: {
              message: 'Order placed successfully',
              products: this.cartDataClient,
              orderId: data[0].id,
              total: cartData.total,
            },
          };

          this.router.navigate(['/endOrder'], navigationExtras).then(() => {
            this.cartDataClient = [];
            localStorage.removeItem('cart');
          });
      } else {
        this.router.navigateByUrl('/checkout').then(() => {
          // Handle failure, e.g., show an error message
        });
      }
    })
  }
  

}