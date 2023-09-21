import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import {CartService} from "../../services/cart.service";
import { ProductModelServer } from 'src/app/model/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   // Tableau pour stocker les produits
  products: any;

  constructor(public productService: ProductService,
              private cartService: CartService,
              ) { }

  ngOnInit(): void {
     this.productService.getAllProducts().subscribe( 
      (data: any) => this.products = data
    )
  }

    // Méthode pour ajouter un produit au panier en fonction de son ID
  addToCart(id: number) {
    this.productService.getSingleProduct(id).subscribe(
      (product: ProductModelServer) => {
        this.cartService.addToCart(product);
      }
    );
  }

  // AddProduct(id: number) {
  //   this.cartService.AddProductToCart(id);
  // }

  // AddProduct(id: Number) {
  //   this.cartService.AddProductToCart(id);
  // }


}
