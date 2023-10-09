import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // Quantité d'articles dans le panier
  cartQuantity=0;
  // Informations de l'utilisateur connecté
  user!:User;
  constructor(cartService:CartService,private userService:UserService) {
    // mettre à jour la quantité du panier
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })
    // mettre à jour les informations de l'utilisateur
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
   }

  ngOnInit(): void {
  }
  
  // Fonction pour se déconnecter de l'application
  logout(){
    this.userService.logout();
  }
  
  // Propriété calculée pour vérifier si l'utilisateur est authentifié
  get isAuth(){
    return this.user.token;
  }
}