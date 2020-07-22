import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { BasicAuthService } from './auth/basic-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  //(2) 
  constructor(private http: HttpClient,
              private auth: BasicAuthService) { }

  //(HINT) -  basic-auth.service.ts for reference
  registerUser(user: User) {
    //(1) HTTP CALL TO CREATE A USER: HttpClient injection
    //(2) make a POST request ( see the basic auth service for reference ) and return the observable.
    //(3) - Optional: Use a .pipe() to manipulate the response object before emiting the result to the component.
    return this.http.post(`${environment.baseUrl}/eshop/users`, user, { observe: 'response', responseType: 'json' })
      .pipe(
        switchMap(response => this.handleSuccess(response, user)),
        catchError(error => throwError("Something Went wrong"))
      );
  }

  handleSuccess(response: HttpResponse<any>, user: User) {
    return this.auth.userLogin( user.username, user.password );
  }

}
