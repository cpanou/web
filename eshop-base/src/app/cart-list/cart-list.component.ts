import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Product } from '../model/Product';
import { CartAction, CartEvent, CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cartList: Map<string, Product[]> = new Map();
  cartEntries: IterableIterator<[string, Product[]]> = this.cartList.entries();
  cartEmpty: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.initCartListener();
    this.initProductList();
  }

  ngOnDestroy(): void {
  }

  initCartListener() {
    this.cartService.getCartSubject()
      .pipe(
        filter(event => event != null)
      )
      .subscribe(
        event => this.handleEvent(event)
      );
  }

  initProductList() {
    this.cartList.clear();
    this.cartService.getProductListFromCookie()
      .forEach(product => {
        if (!this.cartList.has(product.productName)) {
          let list: Product[] = [product];
          this.cartList.set(product.productName, list);
        } else
          this.cartList.get(product.productName).push(product);
      });
      this.cartEmpty = this.cartList.size <= 0;
  }
  getCartListEntries(){
    return Array.from(this.cartList.entries());
  }

  handleEvent(event: CartEvent) {
    console.log(event);
    if (event.action === CartAction.ADD) {
      this.addToCart(event.product.productName);
    } else if (event.action === CartAction.REMOVE) {
      this.removeFromCart(event.product.productName);
    } else if (event.action === CartAction.UPDATE) {
      this.initProductList();
    }
  }

  addToCart(product: string) {
    this.cartService.addToCart(this.cartList.get(product)[0]);
  }

  removeFromCart(product: string) {
    this.cartService.removeFromCart(this.cartList.get(product)[0]);
  }

}
