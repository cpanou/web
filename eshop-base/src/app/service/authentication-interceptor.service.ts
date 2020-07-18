import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthService } from './basic-auth.service';
import { catchError, retryWhen, mergeMap, delay } from 'rxjs/operators';
import { error } from 'protractor';
import { throwError, Observable, of } from 'rxjs';

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
    return next.handle(request)
      .pipe(
        retryWhen(errors => this.handleForbidden(errors)),
        catchError( error => {
          return throwError(error )
        })
      );
  }

  handleForbidden(errors: Observable<any>) {
    return errors
      .pipe(
        delay(500),
        mergeMap( (error) => {
          if(error.status == 403) {
            //Call refresh tokens
            console.log(error.error);
            return this.auth.refreshToken();
          }
          //throwError
          return throwError(error);
        })
      );
  }

}
