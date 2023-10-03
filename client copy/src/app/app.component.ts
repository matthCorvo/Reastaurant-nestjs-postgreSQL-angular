import { Component, ElementRef, AfterViewInit  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

let bootstrap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private modalService: NgbModal, private elementRef: ElementRef) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  
  // ngAfterViewInit() {
  //   // Initialize the Offcanvas component
  //   new bootstrap.Offcanvas(this.elementRef.nativeElement.querySelector('#offcanvasScrolling'));
  // }
}