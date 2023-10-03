import { Component, Input, OnInit  } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {


  @Input()
  visible = false;
  @Input()
  notFoundMessage = "Votre panier est vide";  

  ngOnInit(): void {
  }

 }
