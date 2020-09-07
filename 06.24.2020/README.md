
### Best Styling Practices

```CSS
.centered-page {
    background-color: rgba(122, 118, 118, 0.103);
}
.centered-content {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.centered-logo {
    max-width: 140px;
}
.centered-container {
    text-align: center;
    box-shadow: 2px 2px 10px #ccc;
}
.centered-container.card {
    min-width: 400px;
}
.centered-container-header {
    padding: 10px 10px;
    border-bottom: 1px solid rgba(122, 118, 118, 0.185);
}
.centered-container-body {
    padding: 0 10px;
}
.centered-container-footer {
    padding: 10px 0;
}
.error-msg{
    color: rgba(206, 49, 49, 0.863);
}
.divider{
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    line-height: 0.1em;
    margin: 10px 0 20px;
}
.divider span{
    background:#fff;
    padding:0 10px;
}
```

### RESPONSIVE

```CSS
/* Small devices (tablets, 768px and up) */
@media (min-width: @screen-sm-min) { ... }

/* Medium devices (desktops, 992px and up) */
@media (min-width: @screen-md-min) { ... }

/* Large devices (large desktops, 1200px and up) */
@media (min-width: @screen-lg-min) { ... }
```


### Home Screen


1. Navigation Changes

```
ng generate component home
```

Will hold the navigation component and the remaining content-pages, ```home.component.html```:
```HTML
<app-navbar></app-navbar>

<app-list-products></app-list-products>
```

Routing:
```TS
  { path:'home', component: HomeComponent}
```

RouterLinks for navbar items e.g.:
```HTML
<a class="nav-item nav-link navbar-link" routerLink="/cart">
```

SearchBox
```HTML
    <div class="search-bar">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" aria-label="Username">
            <div class="input-group-append">
                <button type="button" class="btn btn-light">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>
    </div>
```

```CSS
.navbar-nav a {
    white-space: nowrap;
}
```

2. Product List Component

```
ng generate component product-list
```
* Simple Json Object:

```TS
product = {
  id: 1,
  name: "",
  description: "",
  price: 1200
}
```

```HTML
<div class="container">
  <table class="table">
    <thead class="thead-light">
      <tr>
        <th>#</th>
        <th>id</th>
        <th>Name</th>
        <th>description</th>
        <th>price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th >1</th>
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
      </tr>
    </tbody>
  </table>
</div>
```

* List
```TS
  productList = [
    {
      id: 1,
      name: "",
      description: "",
      price: 1200
    },
    {
      id: 2,
      name: "",
      description: "",
      price: 1200
    },
    {
      id: 3,
      name: "",
      description: "",
      price: 1200
    }
  ];
```

```HTML
<tr *ngFor="let product of productList; let i = index">
  <td>{{ i + 1 }}</td>
  <td>{{ product.id }}</td>
  <td>{{ product.name }}</td>
  <td>{{ product.description }}</td>
  <td>{{ product.price }}</td>
</tr>
```

* Product Class
```TS
export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number){

  }
}

  productList = [
    new Product(2345123, "Lenovo p201", "Additional Info 2", 12001),
    new Product(1235437, "Lenovo p201", "Additional Info 3", 12001),
    new Product(1203210, "Lenovo p201", "Additional Info 4", 12001)
  ];
```