import { Component, OnInit } from '@angular/core';
import { OptionService } from 'src/app/services/option.service';
import { Options } from 'src/app/shared/models/Options';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {

  options: Options[] = [];
  constructor(private optionService: OptionService) {
    
  }
  
  ngOnInit(): void {
    this.options = this.optionService.getAll();
  }

}
