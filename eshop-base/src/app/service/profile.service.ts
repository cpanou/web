import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BasicAuthService } from './auth/basic-auth.service';
import { tap } from 'rxjs/operators';
import { Product } from '../product-list/product-list.component';
import { User } from '../model/user';
import { JwtUtilService } from './auth/jwt-util.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private auth: JwtUtilService
    ) { }


  getUser() {
    return this.http.get<User>(`${environment.baseUrl}/eshop/users/${this.auth.getUserId()}`, { observe: "body", headers: { 'Content-Type': 'application/json' } });
  }  

}
