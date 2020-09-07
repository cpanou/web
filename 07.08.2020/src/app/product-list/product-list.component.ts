import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // product = {
  //   id: "SR-1231",
  //   name: "Lenovvo X-02",
  //   price: 2200
  // };

  productList = [ ];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllProducts();
  }

}

export class Product{
  constructor(
    public id: number,
    public name: string,
    public price: number
  ){}
}