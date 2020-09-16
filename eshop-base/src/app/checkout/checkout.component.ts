import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../model/order';
import { CartService } from '../service/cart.service';
import { CheckoutService } from '../service/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  success: boolean = false;
  order: Order;
  successMessage: string = 'Order Placed!! order id:';

  error: boolean = false;
  errorMessage: string = 'Something Wrong! Status:';

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService) { }

  ngOnInit(): void {

  }

  submitOrder(): void {
    console.log("Submit pressed");
    let productList = this.cartService.getProductListFromCookie();
    console.log(productList);
    this.checkoutService.placeOrder(productList)
      .subscribe(
        data => this.handleNewOrder(data),
        error => this.handleError(error)
      );
  }

  handleNewOrder(order: any) {
    this.success = true;
    this.error = false;
    
    this.order = {
      id: order['id'],
      status: order['status'],
      submittedDate: order['submittedDate'],
      processedDate: order['processedDate'],
      user: order['user'],
      productList: order['productList']
    }

  }

  handleError(error: HttpErrorResponse) {
    this.error = true;
    this.success = false;
    this.errorMessage = 'Status: ' + error.status + ' Message:' + error.message;
  }

}
