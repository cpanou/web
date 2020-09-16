import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService, CartEvent, CartAction } from '../service/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';
import { Product } from '../product-list/product-list.component';
import { element } from 'protractor';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
