
 * **Route Guard** for public pages

  ```
  ng generate service service/route-guard-public
  ```

  ```TS
  export class RouteGuardPublicService implements CanActivate {
  ```

  ```TS
    canActivate(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot): boolean {
      if(!this.auth.isLoggedIn())  
        return true;
      this.router.navigate(['/home']);
      return false;
      }
  ```

  Using the routeGuard Service
  ```app.routing.module```:
  ```TS
    { path:'', component: LoginComponent, canActivate: [RouteGuardPublicService]},
    { path:'login', component: LoginComponent, canActivate: [RouteGuardPublicService]},
    { path:'sign-up', component: RegisterComponent, canActivate: [RouteGuardPublicService]},
  ```


# **Setting Up for http calls**

Guide: (Angular Http)[https://angular.io/guide/http]

Before you can use HttpClient, you need to import the Angular HttpClientModule. Most apps do so in the root AppModule.

```TS
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
//Mandatory Import
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

You can then inject the ```HttpClient``` service as a dependency of an application class.
The HttpClient service makes use of observables for all transactions. You must import the RxJS observable and operator symbols that appear in the example snippets. These ConfigService imports are typical.

```TS
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
```

Inject the httpClient in login service:
```TS
  constructor(private http: HttpClient) {

   }
```
* Create User class to POST to our backend

```
ng generate class model/user
```

Use the ```HTTPClient``` to fetch data from a server. The asynchronous method sends an ```HTTP``` request, and returns an ```Observable``` that emits the requested data when the response is received.

The return type varies based on the ```observe``` and ```responseType``` values that you pass to the call. The ```get()``` method takes two arguments; the endpoint URL from which to fetch, and an options object that you can use to configure the request.

(all available options)
```TS
options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }
  ```