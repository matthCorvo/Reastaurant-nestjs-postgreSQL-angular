import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';


@Component({
  selector: 'app-pay-button',
  templateUrl: './pay-button.component.html',
  styleUrls: ['./pay-button.component.css']
})
export class PayButtonComponent implements OnInit{
  @Input()
  order!:Order;
  @ViewChild('pay', {static: true})
  payElement!:ElementRef;

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private router:Router,
              private toastrService: ToastrService) { }

  ngOnInit(): void {

    this.payElement.nativeElement.addEventListener('click', () => {

      this.orderService.pay(this.order).subscribe({
        next: (orderId) => {
          this.cartService.clearCart();
          this.router.navigateByUrl('/track/' + orderId);
          this.toastrService.success(' Paiement enregistré avec succès', 'Success');
        },
        error: () => {
          this.toastrService.error('Échec de enregistrement du paiement', 'Error');
        },
      });
    });
  }
}