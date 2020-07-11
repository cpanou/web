import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from '../model/credentials';


export const AUTH_TOKEN = 'idToken';
export const USER_ID = 'userId';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  constructor(private http: HttpClient) { }

  userLoginBreakdown(username: string, password: string) {
    let credentials = new Credentials(username, password);

    //(1)
    const loginObservable = this.http.post(`${environment.baseUrl}/eshop/login`, credentials, { observe: "response", responseType: 'json' });

    //(2)
    // const filterStatusOperator = filter( (response: HttpResponse<Object>) => response.status == 200);
    const mapToHeadersOperator = map((response: HttpResponse<Object>) => this.handleResponse(response, username));
    const errorHandlerOperator = catchError(this.handleError);

    const chain = pipe(
      // filterStatusOperator,
      mapToHeadersOperator,
      errorHandlerOperator
    );

    //(3)
    return chain(loginObservable);
  }

  userLogin(username:string, password: string) {
    let credentials = new Credentials(username, password);
    return this.http.post(`${environment.baseUrl}/eshop/login`, credentials, { observe: "response", responseType: 'json' })
                        .pipe(
                          map((response: HttpResponse<Object>) => this.handleResponse(response, username)),
                          catchError(this.handleError)
                        );
  }

  handleResponse(response: HttpResponse<Object>, username: string) {
    console.log(response.headers);
    let authToken = response.headers.get("Authorization").split(' ')[1];
    sessionStorage.setItem(AUTH_TOKEN, authToken);
    sessionStorage.setItem(USER_ID, username);
    return response;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`Generic Error  ${error.error.message}`);
    } else {
      console.log(`Error Status: ${error.status}, Error Message: ${error.message} `);
    }
    return throwError(" Something Went wrong ");
  }

  logout() {
    sessionStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(USER_ID);
  }

  isLoggedIn(): boolean {
    let token = sessionStorage.getItem(AUTH_TOKEN);
    let user = sessionStorage.getItem(USER_ID);
    return token !== null && user !== null;
  }

  getIdToken(){
    return sessionStorage.getItem(AUTH_TOKEN);
  }
}
