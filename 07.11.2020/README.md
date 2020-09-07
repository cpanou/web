
# Intercepting requests for jwt authorization

GENERATE SERVICE:

```
ng generate service service/interceptors/JwtAuthInterceptor
```

```TS
import { Injectable } from '@angular/core';
import {
  HttpEvent, JwtAuthInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
```

What we need now is the ```BasicAuthService``` to get the Auth token.

```TS
let token = this.auth.getUserToken();
```
We need to create an ```Authorization``` Header for the Bearer token.
```TS
    let authorization =`Bearer ${token}`;
```
PUT THE HEADER TO THE OUTGOING REQUEST
```TS
  req = req.clone({
    setHeaders : {
      Authorization : authorization
    }
  });
```

INFORM THE INTERCEPTOR TO CONTINUE
```TS
return next.handle(req);
```

CONFIGURE THE INTERCEPTOR AS A PROVIDER

```app.modules```
```TS
  providers: [
    { provide: HTTP_INTERCEPTORS , useClass : JwtAuthInterceptorService, multi: true }
  ],
```

#### LETS FETCH THE PRODUCTS

```
ng generate service service/ProductsService
```

* Lets First Expose the Products from our Rest API


#### Handling Session Expiration with our token as a refresh token!

CASE:
  THE JWT EXPIRES!! but we are still roaming the page!

* ```BACK-END```
We will create an endpoint that accepts our current expired jwt and that will refresh it if it is valid and expired in the last 8 hours!!!

* ```Authenticatio Service```

implement refresh token endpoint.


* ```Interceptor```

 - logout the user!!! important
  the backend protects its resources BUT we need to protect our urls too!

 - Now Lets Handle the expired token response!!!

 2. add switchMap to the refreshTokens() call
 ```TS
    this.auth.refreshToken()
      .pipe(
        switchMap(response => {
          if (response.status == 201)
            return next.handle(this.getRequestWithHeader(req))
          this.auth.logout();
          return throwError(response);
        })
      );
 ``` 

3. Change basic-auth service logout to redirect

4. add clear auth tokens for refresh tokens call

```TS
  logout(): void {
    this.clearAuth();
    this.router.navigate([''])
  }

  clearAuth(){
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('token');
  }
```