import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/Product';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-actual-list',
  templateUrl: './actual-list.component.html',
  styleUrls: ['./actual-list.component.css']
})
export class ActualListComponent implements OnInit {

  @Input('productList') productList;

  constructor(private cart:CartService) { }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    this.cart.addToCart(product);
  }

}
