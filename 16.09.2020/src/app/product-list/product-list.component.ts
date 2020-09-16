import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { SearchService } from '../service/search.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  errorMessage: string;
  serverError: boolean = false;

  productList: Product[] = [];

  constructor(
    private productService: ProductsService,
    private searchSubject: SearchService,
    private cart: CartService) { }

  ngOnInit(): void {
    //subscribe to the search sub. 
    this.searchSubject.getProductSubject()
      .subscribe(
        event => {
          this.searchProducts(event);
        }
      );

    this.productService.getAllProducts()
      .subscribe(
        data => { this.productList = data },
        error => { console.log(error) }
      );
  }

  searchProducts(searchTerm: string) {
    if (searchTerm != null)
      this.productService.searchProduts(searchTerm)
        .subscribe(
          data => {
            if (data.length <= 0) {
              this.serverError = true;
              this.errorMessage = "Something went wrong!"
            }
            else {
              this.serverError = false;
            }
            this.productList = data
          },
          error => {
            this.serverError = true;
            this.errorMessage = "Something went wrong!"
          }
        );
  }


  //Bind the searchTerm alias to a local attribute
  @Input('searchTerm')
  set searchTerm(searchAttr: string) {
    console.log(searchAttr);
  }

  addToCart(product: Product) {
    this.cart.addToCart(product);
  }

  // removeFromCart(productId: string){
  //   this.cart.removeFromCart(productId);
  // }


}

export interface Product {
  id: number,
  productName: string,
  price?: number,
  info?: string,
  available?: number,
  category?: string,
  type?: string
}