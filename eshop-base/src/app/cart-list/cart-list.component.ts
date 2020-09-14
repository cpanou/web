import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product-list/product-list.component';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  @Input()
  cartMap: Map<string, Product[]>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  getCartListEntries(){
    return Array.from(this.cartMap.entries());
  }

  addToCart(product: string) {
    this.cartService.addToCart(this.cartMap.get(product)[0]);
  }

  removeFromCart(product: string) {
    this.cartService.removeFromCart(this.cartMap.get(product)[0]);
  }

}
