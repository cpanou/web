import { Component, OnInit } from '@angular/core';
import { Product } from '../product-list/product-list.component';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  productList : Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.productList = this.cartService.getProductListFromCookie();
  }

}
