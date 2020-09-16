import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { CartService } from '../service/cart.service';
import { ProductsService } from '../service/products.service';
import { SearchService } from '../service/search.service';

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
            this.productList = this.parseProducts(data);
          },
          error => {
            this.serverError = true;
            this.errorMessage = "Something went wrong!"
          }
        );
  }

  parseProducts(dataList: Product[]) : Product[] {
    let productList : Product[];
    for(let i =0; dataList.length > i; i++) {
      let product: Product;
      let data = dataList[i];
      product = {
        id: data['id'],
        productName: data['productName'],
        price: data['price'],
        info: data['info'],
        available: data['available'],
        category: data['category'],
        type: data['type']
      }
      productList.push(product);
    }
    return productList;
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
