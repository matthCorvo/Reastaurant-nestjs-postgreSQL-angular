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
      console.log(' commande reçu:', order);
      this.order = order;
    },
    error: (error) => {
      console.error('Error:', error); 
      router.navigateByUrl('/checkout');
    }
  });
}


  ngOnInit(): void {
  }

}