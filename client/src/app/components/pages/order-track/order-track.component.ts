import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.css']
})

export class OrderTrackPageComponent implements OnInit {

  order!:Order;
  constructor(activatedRoute: ActivatedRoute, orderService:OrderService) {
     
    // Capture les paramètres de la route actuelle
    const params = activatedRoute.snapshot.params;
    // Si l'ID de commande n'est pas fourni dans les paramètres, arrête l'exécution 
     if(!params.orderId) return; 

     orderService.trackOrderById(params.orderId).subscribe(order => {
       this.order = order;
     })

  }

  ngOnInit(): void {
  }

}