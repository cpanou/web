
So now when a user enters the input and presses enter! the new value will be emited to the product component and the component will call the endpoint to search for a product



#### Cookies
```Shell
 npm install ngx-cookie-service
```
`app.modue.ts`:
```TS
  providers: [
    //Add Cookie Service as a provider
    CookieService,
    { provide: HTTP_INTERCEPTORS , useClass : JwtAuthInterceptorService, multi: true }
  ],
```



* **UI LeftOvers:**

* Product - List Component:

```HTML
<div class="container">
  <div class="list-container">
    <div class="product-item" *ngFor="let product of productList; let i = index">
        <div class="product-info-left flexbox-column">
          <div class="">{{ product.id }}</div>
        </div>
        <div class="product-info-middle">
          <h6 class="">{{ product.productName }}</h6>
          <div class="">{{ product.info }}</div>
        </div>
        <div class="product-info-right flexbox-column">
          <span class="">${{ product.price | currency }}</span>
          <button class="btn btn-outline-primary">
            <i class="fa fa-shopping-cart fa-2x"></i>
            <div>Add to Cart</div>
          </button>
        </div>
      </div>
    </div>
</div>
```

```CSS
.list-container {
    padding: 10px;
}
.product-item {
    position: relative;
    display: flex;
    flex-direction: row;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    margin: 4px;
    box-shadow: 2px 2px 10px #ccc;
}
/* Left Panel */
.product-info-left {
    border-right: 1px solid rgba(0,0,0,.125);
    min-width: 100px;
    justify-content: center;
    align-items: center;
}
/* Middle Panel */
.product-info-middle {
    padding: 20px 10px;
    width: 100%;
}
/* Right Panel*/
.product-info-right {
    align-items: center;
    justify-content: center;
    margin-right: 20px;
}
.product-info-right button {
    font-size: 8px;
    padding: 2px 10px;
    white-space: nowrap;
    max-width: fit-content;
}
.product-info-right span {
    font-size: 14px;
    font-weight: 700;
    color: rgb(76, 158, 131);
    margin-bottom: 10px;
}
.gray-bg {
    background-color: black;
}
```

## Implement Cart

```Shell
ng generate component cart
```

* add cart selector to the Home component:

```HTML
<app-cart></app-cart>
```
Style it:
```HTML
<div style="display:flex;flex-direction: row;justify-content: center;">
    <app-list-products [searchTerm]="searchTerm"></app-list-products>

    <app-cart></app-cart>
</div>
```

`product-list.css`
```CSS
    flex: auto;
```

## Implement User Orders

- Simple Http requests GET


## Implement Profile

- Simple Http GET, PUT?

