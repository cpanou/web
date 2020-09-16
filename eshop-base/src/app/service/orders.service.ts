import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../model/order';
import { JwtUtilService } from './auth/jwt-util.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient,
    private jwt: JwtUtilService) { }

  getOrders() {
    return this.http.get<Order[]>(`${environment.baseUrl}/eshop/users/${this.jwt.getUserId()}/orders`,
      { observe: "response", responseType: 'json' })
      .pipe(
        map(response => { 
          console.log(response);
          return response.body;
        })
      );
  }


}
