import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { FoodService } from '../../../services/food.service';
import { OptionService } from '../../../services/option.service';
import { Food } from '../../../shared/models/Food';
import { Options } from '../../../shared/models/Options';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {
  food!: Food;
  options: Options[] = [];
  returnUrl = '';

  constructor(
    private optionService: OptionService,
    private cartService:CartService,
    private foodService: FoodService, 
    activatedRoute:ActivatedRoute,
    private router: Router
    ) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      foodService.getFoodById(params.id).subscribe(serverFood => {
        this.food = serverFood;
      });
    })
  }
  
  ngOnInit(): void {
    this.options = this.optionService.getAll();
  }

  addToCart(food: Food) {
    console.log('Ajouter au panier:', food);
    this.cartService.addToCart(food);
    this.router.navigateByUrl(this.returnUrl);
  }
}
