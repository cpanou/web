import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../product-list/product-list.component';
import { JwtUtilService } from './auth/jwt-util.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient, private jwt: JwtUtilService) { }

  placeOrder(productList:Product[]) {
    return this.http.post( `${environment.baseUrl}/eshop/users/${this.jwt.getUserId()}`, 
                          productList,
                          { observe: "response", responseType: 'json' })
                .pipe(
                  map( response => {
                    console.log(response);
                    return response.body;
                  })
                );
  }

}
