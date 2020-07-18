import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from '../../model/credentials';
import { Router } from '@angular/router';
import { JwtUtilService, UserInfo } from './jwt-util.service';


@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  constructor(private http: HttpClient,
              private router: Router,
              private jwt: JwtUtilService) { }

  userLoginBreakdown(username: string, password: string) {
    let credentials = new Credentials(username, password);

    //(1)
    const loginObservable = this.http.post(`${environment.baseUrl}/eshop/login`, credentials, { observe: "response", responseType: 'json' });

    //(2)
    // const filterStatusOperator = filter( (response: HttpResponse<Object>) => response.status == 200);
    const mapToHeadersOperator = map((response: HttpResponse<Object>) => this.handleResponse(response));
    const errorHandlerOperator = catchError(this.handleError);

    const chain = pipe(
      // filterStatusOperator,
      mapToHeadersOperator,
      errorHandlerOperator
    );

    //(3)
    return chain(loginObservable);
  }


  // Logins a User given a username and password
  userLogin(username:string, password: string) {
    let credentials = new Credentials(username, password);
    //http POST receives 3 inputs ( 1. Url , 2. Object to POST (Request Body), 3. http options (headers etc..))
    return this.http.post(`${environment.baseUrl}/eshop/login`, credentials, { observe: "response", responseType: 'json' })
                        //The pipe method is used to chain operations together and re-emit the results to the initial Obserable 
                        //Any operation in the pipe method will be executed before the .subscribe() callbacks!!!!!( see login component )
                        //
                        //(NOTE) - We use the pipe operation to intercept the Response so that we can get the token and save it in the session before 
                        //  the callbacks of the login component are invoked.
                        //
                        .pipe(
                          //The map operation is used to transform the Observables response to another Type
                          // e.g. From an HttpResponse object to a Response.body ( a JSON object )
                          map((response: HttpResponse<Object>) => this.handleResponse(response)),
                          //The catchError operation is used to handle any error response ( HTTP code 4xx || 5xx )
                          catchError(this.handleError)
                        );
  }

  handleResponse(response: HttpResponse<Object>) {
    let authToken = response.headers.get("Authorization").split(' ')[1];
    this.jwt.parseUserFromToken(authToken);
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


  refreshToken(){
    let token = sessionStorage.getItem(UserInfo.AUTH_TOKEN);
    this.clearUserAuthentication();
    return this.http.post(`${environment.baseUrl}/eshop/users/token`, { token : token }, { observe : "response", responseType: 'json'  })
      .pipe(
        tap( response => {
          console.log(response.body);
          if( response.status == 201){
            this.jwt.parseUserFromToken(response.body['token']);
          }
        })
      )
  }

  clearUserAuthentication() {
    this.jwt.clearUserInfo();
  }

  logout() {
    this.clearUserAuthentication();
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    let token = sessionStorage.getItem(UserInfo.AUTH_TOKEN);
    return token !== null;
  }

  getIdToken(){
    return sessionStorage.getItem(UserInfo.AUTH_TOKEN);
  }

}
