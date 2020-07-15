import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  productList = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllProducts()
      .subscribe(
        data => { this.productList = data },
        error => { }
      );
  }

}

export class Product {
  constructor(
    public id: number,
    public productName: string,
    public price: number,
    public info: string,
    public available: number,
    public imageUrl: string,
    public category: string,
    public type: string
  ) { }
}