import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { BasicAuthService } from './basic-auth.service';
import { catchError, retryWhen, mergeMap, delay, switchMap } from 'rxjs/operators';
import { error } from 'protractor';
import { throwError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private auth: BasicAuthService) { }

  //intercept every request
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    //(1) check if the user is logged in 
    if (this.auth.isLoggedIn()) {
      //(2) append the Authorization header with the bearer token
      request = this.getRequestWithAuthHeader(request);
    }
    //(3) Pass on the request to the next handler
    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error.status == 403 || error.status == 401)
            return this.handleForbidden(error, request, next);
          return throwError(error);
        })
      );
  }

  getRequestWithAuthHeader(request: HttpRequest<any>) {
    let bearer = `Bearer ${this.auth.getIdToken()}`;
    return request.clone({
      setHeaders: {
        Authorization: bearer
      }
    });
  }

  handleForbidden(error: HttpErrorResponse, originalRequest: HttpRequest<any>, next: HttpHandler) {
    if (error.error != null && error.error['code'] == 102) {
      //Call refresh tokens
      console.log(error.error['message']);
      return this.auth.refreshToken()
        .pipe(
          switchMap(
            response => {
              if (response.status == 201)
                return next.handle(this.getRequestWithAuthHeader(originalRequest));
              this.auth.logout();
              return throwError(response.statusText);
            }
          )
        );
    }
    //throwError
    this.auth.logout();
    return throwError(error);
  }

}
