import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { Observable, sample } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FOODS_BY_SEARCH_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }


  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getFoodById(foodId:string):Observable<Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }

}
