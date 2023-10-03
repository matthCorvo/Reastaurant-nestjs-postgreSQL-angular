import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-btn-add-to-cart',
  templateUrl: './btn-add-to-cart.component.html',
  styleUrls: ['./btn-add-to-cart.component.css']
})
export class BtnAddToCartComponent implements OnInit {
  food!: Food;

  constructor( private cartService:CartService, foodService:FoodService) {}


  ngOnInit(): void {
  
  }

  addToCart() {
    this.cartService.addToCart(this.food);
  }
}