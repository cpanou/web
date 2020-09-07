import { Component, OnInit } from '@angular/core';

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

  productList = [
    new Product(1, "Lenovvo X-03", 2200 ),
    new Product(1, "Lenovvo X-03", 2200 ),
    new Product(1, "Lenovvo X-03", 2200 ),
    new Product(1, "Lenovvo X-03", 2200 ),
    new Product(1, "Lenovvo X-03", 2200 ),
    new Product(1, "Lenovvo X-03", 2200 ),
    new Product(1, "Lenovvo X-03", 2200 ),
    new Product(1, "Lenovvo X-03", 2200 ),
    new Product(1, "Lenovvo X-03", 2200 )
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

export class Product{
  constructor(
    public id: number,
    public name: string,
    public price: number
  ){}
}