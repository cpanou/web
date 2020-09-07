
## Fixes Retry for JWT-REFRESH

Explain : 
```TS
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
```

## Store additional variables in our JWT

1. ANGULAR DECODE JWT

```npm install @auth0/angular-jwt```

```ng generate service service/auth/jwt-util```

2. Add jwtHelper
 -  ```method parseUserFromToken()```
  ```TS
  parseUserFormToken(token: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('auth', token);
  }
  ```
 - Add dependency to the npm module
 
 ```TS
import { JwtHelperService } from '@auth0/angular-jwt';
 ```

 - DecodeToken and read claims
 
 ```TS 
  private jwt: JwtHelperService;

  constructor() {
    this.jwt = new JwtHelperService();
  }

  parseUserFormToken(token: string) {
    //store original token
    sessionStorage.setItem('token', token);
    //decode token
    let decodedToken = this.jwt.decodeToken(token);
    /* 
      decoded JWT : {
        "sub": "8",
        "exp": 1595015776,
        "iat": 1595015766
      }
    */
    sessionStorage.setItem('auth', decodedToken['sub']);
  }
 ```

3. Basic auth dependency
  - user the helper to store the tokens

  ```TS
  this.jwtHelper.parseUserFormToken(response.body['token']);
  ```


### Search Products

1. GENERATE COMPONENT 

```
ng generate component search
```

2. ADD HTML **SEARCH**

  ```HTML
<div class="search-bar">
    <form >
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" name="search" [(ngModel)]="searchTerm">
            <div class="input-group-append">
                <button type="submit" class="btn btn-light" (click)="search()">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>
    </form>
</div>
  ```

  ```CSS
  .navbar-nav a {
    white-space: nowrap;
  }
  ```  

3. ADD SEARCH SELECTOR AT **NAVBAR**

```HTML
<app-search></app-search>
```
```CSS
   .navbar-nav a {
    white-space: nowrap;
  }
```  

4. Implement Search for products: ```search.component.ts```

```TS
  private searchTerm: string;

  search(){
      alert(this.searchTerm);
  }
```
