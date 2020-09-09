import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product-list/product-list.component';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new EventEmitter<CartEvent>(null);

  constructor(private cookies: CookieService) { }


  addToCart(product: Product) {
    this.addToCookie(product);
    this.emitEvent(product, CartAction.UPDATE);
  }

  private addToCookie(product: Product) {
    let productList: Product[] = this.getProductListFromCookie();
    productList.push({ id: product.id , productName: product.productName });
    this.cookies.set('eshopCart', JSON.stringify(productList));
  }

  removeFromCart(product: Product) {
    this.removeFromCookie(product);
    this.emitEvent(product, CartAction.UPDATE);
  }

  private removeFromCookie(product: Product) {
    let productList: Product[] = this.getProductListFromCookie();
    let index = productList.findIndex(value => value.id == product.id);
    productList.splice(index, 1);
    this.cookies.set('eshopCart', JSON.stringify(productList));
  }
  
  public getProductListFromCookie() {
    let value = this.cookies.get('eshopCart');
    let productList: Product[] = [];
    if (value !== null && value.length > 0)
      productList = JSON.parse(value);
    return productList;
  }

  getCartSubject(): EventEmitter<CartEvent> {
    return this.cartSubject;
  }

  private emitEvent(product: Product, action: CartAction) {
    let addEvent = {
      action: action,
      product: product
    };
    this.cartSubject.emit(addEvent);
  }

}

export enum CartAction {
  ADD, REMOVE, UPDATE
}

export interface CartEvent {
  action: CartAction;
  product: Product;
}
