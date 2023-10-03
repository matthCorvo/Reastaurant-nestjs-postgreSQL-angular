import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { Observable, sample } from 'rxjs';
import { sample_foods } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[]{
    return sample_foods;
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    // return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  // getFoodById(foodId:string):Observable<Food>{
  //   // return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  // }
}
