import { Component, Input, OnInit } from '@angular/core';
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

  productList = [];

  constructor(private productService: ProductsService,
    private searchSubject: SearchService) { }

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
    // this.productService.searchProduts(searchAttr)
    //   .subscribe(
    //     data => {
    //       if (data.length <= 0) {
    //         this.serverError = true;
    //         this.errorMessage = "Something went wrong!"
    //       }
    //       else {
    //         this.serverError = false;
    //       }
    //       this.productList = data
    //     },
    //     error => {
    //       this.serverError = true;
    //       this.errorMessage = "Something went wrong!"
    //     }
    //   );
  }


}

export class Product {
  constructor(
    public id: number,
    public productName: string,
    public price: number,
    public info: string,
    public available: number,
    public category: string,
    public type: string
  ) { }
}