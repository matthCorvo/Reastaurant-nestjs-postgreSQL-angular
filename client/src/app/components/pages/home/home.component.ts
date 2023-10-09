import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  food!: Food;
  foods: Food[] = [];

  constructor(
    private foodService: FoodService, 
    private activatedRoute: ActivatedRoute,
    private cartService:CartService
    ) {

    let foodsObservable: Observable<Food[]>;
    this.activatedRoute.params.subscribe((params) => {
      if(params.id) 
      foodService.getFoodById(params.id).subscribe(serverFood => {
        this.food = serverFood;
      });
      if (params.searchTerm) {
        // Si un terme de recherche est spécifié dans les paramètres d'URL,
        // récupère les aliments correspondants depuis le service.
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      } else {
        // Sinon, récupère tous les aliments depuis le service.
        foodsObservable = this.foodService.getAll();
        
        //  mettre à jour la liste d'aliments
        foodsObservable.subscribe((serverFoods) => {
          this.foods = serverFoods;
        })
      }
    });
  }


  ngOnInit(): void {
  }

  addToCart(food: Food) {
    console.log('Add to Cart clicked for food:', food);
    this.cartService.addToCart(food);
    // this.router.navigate(['/']);
  }
}