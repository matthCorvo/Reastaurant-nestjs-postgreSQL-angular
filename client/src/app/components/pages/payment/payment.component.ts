import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../shared/models/Order';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
 
 order:Order = new Order();
 constructor(orderService: OrderService, router: Router) {
  orderService.getNewOrderForCurrentUser().subscribe({
    next: (order) => {
      console.log('Received order:', order); // Add this line
      this.order = order;
    },
    error: (error) => {
      console.error('Error:', error); // Add this line
      router.navigateByUrl('/checkout');
    }
  });
}


  ngOnInit(): void {
  }

}