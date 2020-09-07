
## Login Component

1. Create the component:
```Shell
ng generate component login
```

2. Html template:
```HTML
    <div class="form-group">
        <label for="username">username</label>
        <input type="email" class="form-control" id="username"  [(ngModel)]="username">
      </div>
      <div class="form-group">
        <label for="password" >Password</label>
        <input type="password" class="form-control" id="password"  [(ngModel)]="password">
      </div>
      <button (click)="login()" class="btn btn-dark">Submit</button>
```

3. EVENT BINDING

(click)="login()

* Event handler method in the typescript file

```TS
  login(): void {
    console.log(this.username);
    console.log(this.password);
  }
```

3. introduce Properties

```TS
import { FormsModule } from '@angular/forms';

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ]
  <small *ngIf='loggedIn'>{{message}}</small>
  message = "invalid Credentials";
```

```TS
  login(): void {
    console.log(this.username);
    console.log(this.password);
    if(this.username === "me" && this.password === "123")
      this.loggedIn = true;
    else
      this.loggedIn = false;
  }

```

[FontAwesome Cheats](https://fontawesome.bootstrapcheatsheets.com/)
[Bootstrap](https://getbootstrap.com/docs/4.0/components/buttons/)



## Navigation Bar Component

Create the component:
```
ng generate component navbar
```

edit the html file:
```HTML
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand">
        <i class="fa fa-home"></i>
        E-Shop
    </a>

    <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav ml-auto">
            <a class="nav-item nav-link ">
                <i class="fa fa-shopping-cart"></i>
                Cart
            </a>
            <a class="nav-item nav-link ">
                <i class="fa fa-list-ul"></i>
                Orders
            </a>
            <a class="nav-item nav-link ">
                Username
            </a>
            <a class="nav-item nav-link ">
                Sign In/Sign Out
            </a>
        </div>
    </div>
</nav>
```