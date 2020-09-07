
## SERVICES - AUTHENTICATION

We want to separate our application in public and protected pages.
We only want to pass the introductory pages if the user is logged-In. We will create
Since all components will need to check if the user is authenticated,
we will create a service to handle all the common authentication logic.

```
ng generate service service/basic-auth
```

```TS
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  constructor() { }

  login(username:string, password:string): boolean {

  }

}
```
```TS
  login(username: string, password: string): boolean {
    let isAuthenticated = username === "me" && password === "123";
    if (isAuthenticated) {
      return true;
    } else return false;
  }
```

2. Dependency injection - Injection in ```LoginComponent```

```TS
  constructor(
    private router: Router,
    private basicAuth : BasicAuthService) {
  }
```

Usage in login():
```TS
  login(): void {
    console.log(this.username);
    console.log(this.password);
    if(this.basicAuth.login(this.username, this.password)){
      this.router.navigate(['home']);
      this.showError = false;
    }else
      this.showError = true;
  }
```

3. Using sessionStorage to share accross components.

 * sessionStorage - dies after session is killed.
 * localStorage - persists after session is killed.

Usage in the service:
```TS
  login(username: string, password: string): boolean {
    let isAuthenticated = username === "me" && password === "123";
    if (isAuthenticated) {
      sessionStorage.setItem('auth', username);
      return true;
    } else return false;
  }
```

Whats left? Logout

```TS
  logout():void {
    sessionStorage.removeItem('auth');
  }
```

```NavBar``` component:
```TS
  logout():void {
    this.basicAuth.logout();
    this.router.navigate(['login']);
  }
```

```HTML
<a class="nav-item nav-link" routerLink="/#" (click)="logout()">
    <!-- <a (click)="logout()" class="nav-item nav-link "> -->
    Sign Out
</a>
```

## Route Guards

Define protected and public pages:

```
ng generate service service/routeGuard
```

```TS
export class RouteGuardService implements CanActivate {
```

CanActivate callback to protect pages

implement method:
```TS
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return true;
  }
```

return true to activate the router path.
 So only if the user is logged in we will enable the paths.
 If not the paths will not be reachable.(protected)

```authentication.service:```
Implement the method to check for authentication.

```TS
  isLoggedIn():boolean {
    let username = sessionStorage.getItem('auth');
    return username !== null;
  }
```
```route-guard.service:```
Check if user is logged in:
 ```TS
 //DI FIRST
  constructor(private basicAuth: BasicAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.basicAuth.isLoggedIn())
      return true;

    return false;
  }
 ```

 * Using the routeGuard Service
 ```app.routing.module```:
 ```TS
  { path:'home', component: HomeComponent, canActivate: [RouteGuardService]},
 ```