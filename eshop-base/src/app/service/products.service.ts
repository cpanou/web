import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BasicAuthService } from './auth/basic-auth.service';
import { tap } from 'rxjs/operators';
import { Product } from '../product-list/product-list.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private auth: BasicAuthService
    ) { }


  getAllProducts() {
    return this.http.get<Product[]>(`${environment.baseUrl}/eshop/products`, { observe: "body", headers: { 'Content-Type': 'application/json' } })
      .pipe(
        tap(body => console.log(body))
      );
  }

}
