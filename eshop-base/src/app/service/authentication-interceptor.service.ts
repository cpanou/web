import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthService } from './basic-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private auth: BasicAuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if( this.auth.isLoggedIn() ) {
      let bearer = `Bearer ${this.auth.getIdToken()}`;
      request = request.clone({
        setHeaders : {
          Authorization : bearer
        }
      });
    }
    return next.handle(request);
  }

}
