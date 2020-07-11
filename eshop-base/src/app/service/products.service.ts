import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BasicAuthService } from './basic-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private auth: BasicAuthService) { }


    getAllProducts(){
      return this.http.get(`${environment.baseUrl}/eshop/products`, 
      { observe: "response", headers: { 'Content-Type': 'application/json' } })
        .subscribe(response => {
          console.log(response);
        });
    }


}
