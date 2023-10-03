import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(
    private foodService: FoodService, 
    private activatedRoute: ActivatedRoute,
    private cartService:CartService
    ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      } else {
        this.foods = this.foodService.getAll();
      }
    });
  }


  ngOnInit(): void {
  }

  addToCart(food: Food) {
    this.cartService.addToCart(food);
    console.log(food);
  }
}