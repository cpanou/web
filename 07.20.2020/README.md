

### Registering a user

```
ng generate service service/user-register
```

* implement User registration

Update User class from Spring

http Post

Handle Responses

error message from client


## COMPONENT INTERACTION


```JAVA
---HOME:
    ---NAVBAR:
        ---SEARCH:
    ---PRODUCT-LIST:
```

[interaction](https://angular.io/guide/component-interaction)

1. Parent listens for child event

```TS
//at Child
@Input() // receives data form the parent
@Output() // outputs data to the parent
```

- Search Component:
```TS
  @Output() searched = new EventEmitter<string>();

  search(){
      // alert(this.searchTerm);
      //emmit te search term
      this.searched.emit(this.searchTerm);
  }
```
Clicking a button triggers emission of the search payload.


- The parent ```NavigationComponent``` binds an event handler called onSearched() that responds to the child event payload $event and updates the products Component.
```HTML
     <app-search (searched)="onSearch($event)"></app-search>
```


Now the navbar component is the child component that needs to emit the event
```TS
  @Output() userSearched = new EventEmitter<string>();
  onSearch(event) {
    this.userSearched.emit(event);
  }
```

- The ```HomeComponent``` binds an event handler called onSearched() that responds to the events of the navbar component caught from the search component
```HTML
<app-navbar (userSearched)="onSearch($event)"></app-navbar>
```

```TS
  onSearch(event : Event){
    alert(event);
  }
```

2. Pass data from parent to child with input binding

Now that we reached the true parent component we want to update the product list in the child component
```HOMECOMPONENT```
```HTML
<app-list-products [searchTerm]="searchTerm"></app-list-products>
```

```PRODUCT COMPONENT```
```TS
@Input('searchTerm') searchTerm;
//Use some dummy html attribute to see if we catch the input from the search
```
USE A SETTER TO HAVE A METHOD SO THAT WE CAN CALL THE SERVICE
```TS
  @Input('searchTerm')
  set searchTerm(name: string) {
    this.productsService.searchProducts(name)
    .subscribe(
      result => {
        this.productList = result;
      },
      error => console.log(error));
  }
```

IMPLEMENT SEARCH WITH QUERY PARAM
```productService```add method:

```TS
  searchProducts(searchTerm: string) {
    return this.http.get<Product[]>(`${environment.baseUrl}/eshop/products?search=${searchTerm}`, { observe: 'response', headers: { 'Content-Type': 'application/json' } })
      .pipe(
        map(this.handleResponse),
        catchError(this.handleError)
      );
  }
```

3. LETS See a Faster Way: 
```
ng generate service service/subject/search-product
```

```TS
export class SearchProductsService {
  // create a subject that components can subscribe to!!!
  searchSubject = new BehaviorSubject<string>(null);
}
```

 - Changes in **search-component** :
 ```TS
  search(){
      // alert(this.searchTerm);
      // this.searched.emit(this.searchTerm);
      this.searchService.searchSubject.next(this.searchTerm);
      //the .next method emits a new value to the subject
      //any one subscribed to the subject will receive te update and call the Function
  }
 ```

 - Changes in **product-list**:
 ```TS
   ngOnInit(): void {
    this.initSearchListener();

    this.productsService.getProducts()
      .subscribe(
        result => {
          this.productList = result;
        },
        error => console.log(error));
  }

  initSearchListener() {
    this.searchService.searchSubject.subscribe(
      result => {
        if (result != null)
          this.productsService.searchProducts(result)
            .subscribe(
              result => {
                this.productList = result;
              },
              error => console.log(error));
      }
    );
  }
 ```