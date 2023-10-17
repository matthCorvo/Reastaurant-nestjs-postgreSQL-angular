import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-payed',
  templateUrl: './order-payed.component.html',
  styleUrls: ['./order-payed.component.css']
})
  export class OrderPayedComponent implements OnInit {
    orders: Order[] = [];

    constructor(private orderService: OrderService) {
      let ordersObservable: Observable<Order[]>;
      ordersObservable = this.orderService.getAllPayedOrders();
  
      ordersObservable.subscribe((serverOrders) => {
        this.orders = serverOrders;
      });
    }

    ngOnInit(): void {}
  
    deleteOrder(orderId: number): void {
      this.orderService.delete(orderId).subscribe(() => {
        this.orders = this.orders.filter(order => order.id !== orderId);
      });
    }
  }