import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ORDER_CREATE_URL, ORDER_DELETE_PAYED_URL, ORDER_PAYED_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from '../shared/constants/urls';
import { ORDER_NEW_FOR_CURRENT_USER_URL } from '../shared/constants/urls';
import { Order } from '../shared/models/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient) { }

  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }
  
  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  pay(order:Order):Observable<string>{
    return this.http.post<string>(ORDER_PAY_URL,order);
  }

  trackOrderById(id:number): Observable<Order>{
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }

  getAllPayedOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(ORDER_PAYED_URL);
  }

  delete(id:number): Observable<Order>{
    return this.http.delete<Order>(ORDER_DELETE_PAYED_URL + id);
  }
}