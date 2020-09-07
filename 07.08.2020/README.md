
## Observables - 08.07.2020

The HTTP module uses observables to handle AJAX requests and responses. RxJS (Reactive Extensions for JavaScript) is a library for **reactive programming** using observables that makes it easier to compose **asynchronous** or **callback-based** code.

The library also provides utility functions for creating and working with observables. These utility functions can be used for:

  - **Converting** existing code for async operations into observables
  - **Iterating** through the values in a stream
  - **Mapping** values to different types
  - **Filtering** streams
  - **Composing** multiple streams

* **Observable**

In the ```basic-auth-service.ts``` we add the following function:
```TS
  userLogin(username: string, password: string) {
    let user: Credentials = new Credentials(username, password);

    //(1) Use the HttpClient to make the Request.
    this.http.post<Credentials>('http://localhost:8080/eshop/login', user , { observe: 'response', headers: { 'Content-Type':'application/json' } })
        //(2) The Observable is not executed until we subscribe to it.
        .subscribe(res => { });
  }
```

* **Operators**:

Operators are functions that build on the observables foundation to enable sophisticated manipulation of collections. For example, RxJS defines operators such as ```map()```, ```filter()```, ```concat()```, and ```flatMap()```

Operators take configuration options, and they return a function that takes a source observable. When executing this returned function, the operator observes the source observable’s emitted values, transforms them, and returns a new observable of those transformed values.

```TS
  userLogin(username: string, password: string) {
    let user: User = new User(username, password);

    //(1) We get a reference to the Observable object created by the httpClient.
    const loginObservable = this.http.post<User>('http://localhost:8080/eshop/login', user , { observe: 'response',headers: { 'Content-Type':'application/json' } })

    //(2) We get a reference to a map() operator that takes as input the loginObservable and maps the emmited values to an obserbale of type <Credentials>.
    const respond = map((response:HttpResponse<User>) => response.body);

    //(3) We get a reference to the transformed observable ( Observable<Credentials>)
    const result = respond(loginObservable);

    //(4) We subscribe to the Observable to execute the functions:
    result.subscribe(res=>console.log(res.username));

  }
```

* **Pipes**:

You can use **pipes** to link operators together. Pipes let you combine multiple functions into a single function. The **pipe()** function takes as its arguments the functions you want to combine, and returns a new function that, when executed, runs the composed functions in sequence.

A set of operators applied to an observable is a recipe—that is, a set of instructions for producing the values you’re interested in. By itself, the recipe doesn’t do anything. You need to call subscribe() to produce a result through the recipe.

```TS
  userLogin(username: string, password: string) {
    let user: User = new User(username, password);

    //(1) We get a reference to the Observable object created by the httpClient.
    const loginObservable = this.http.post<User>('http://localhost:8080/eshop/login', user , { observe: 'response',headers: { 'Content-Type':'application/json' } })

    //(2) We create 2 operators that we want to execute and transform the observables resulted values.
    const respond = map((response:HttpResponse<User>) => response.body);
    const filterStatus = filter((response:HttpResponse<User>) => response.status == 200)

    //(3) We will use a Pipe to chain multiple operations
    const chain = pipe(
      filterStatus,
      respond
    );
    //(4) We provide the loginObesrvable to the pipe so that the functions are executed.
    const result = chain(loginObservable);

    //(5) We subscribe to the Observable to execute the functions:
    result.subscribe(res=>console.log(res.username));
  }
```

Since ```pipe()``` is also a function of the observable type we can do the following:
```TS
  userLogin(username: string, password: string) {
    let user: User = new User(username, password);

    //(1) Everything in a Chain!
    this.http.post<User>('http://localhost:8080/eshop/login', user , { observe: 'response', headers: { 'Content-Type':'application/json' } })
        .pipe(
          filter((response:HttpResponse<User>) => response.status == 200),
          catchError(error => this.handleError(error))
        )
        //(2) subscribe to execute
        .subscribe(res => {
        })
  }
```

 If the server returns an error or the value doesn’t exist, an error is produced. If you catch this error and supply a default value, your stream continues to process values rather than erroring out.

Here's an example of using the catchError operator to do this:
```TS
  userLogin(username: string, password: string) {
    let user: User = new User(username, password);

    //(1) Everything in a Chain!
    this.http.post<User>('http://localhost:8080/eshop/login', user , { observe: 'response', headers: { 'Content-Type':'application/json' } })
        .pipe(
          map(this.parseResponse),
          catchError(this.handleError)
        )
        //(2) subscribe to execute
        .subscribe(res => {
        })
  }
```

Now lets create some functions that will handle the ```map``` and ```catchError``` operators:

```TS
  private parseResponse(response: HttpResponse<User>) {
      console.log(headers);
      //(1) Parse the Authorization Header to get the auth token.
      let token = headers.get("Authorization").split(' ')[1];
      //(2) Save the auth token.
      sessionStorage.setItem('token', token);
      return true;
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return map(false);
  };
```

We have set-up our http call to authenticate a user, we want our component to control the execution!!
so we move the subscribe function to the component code.
```TS
  userLogin(username: string, password: string) {
    let user: User = new User(username, password);
    //(1) Everything in a Chain!
    return this.http.post<User>('http://localhost:8080/eshop/login', user , { observe: 'response', headers: { 'Content-Type':'application/json' } })
        .pipe(
          map(this.parseResponse),
          catchError(this.handleError)
        )
  }
```

SHOW ALTERNATIVES FOR ERROR IN THE COMPONENTS

ON ERROR:
  throw Error AGAIN;

ON SUCCESS:
  return the response AGAIN;
  **SERVICE**
  ```TS
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    //CREATING AN OBSERVABLE
    // return of(false);
    return throwError(
      'Something bad happened; please try again later.');
  };
  ```

  **COMPONENT**
```TS
  login(): void {
    this.basicAuth.userLogin(this.username, this.password)
        .subscribe(res=> {
          this.router.navigate(['home']);
          this.showError = false;
        },
        error => {
          this.showError = true;
        });
  }
```

(Documentation)[https://angular.io/guide/rx-library]

problem with Login Headers? CORS - Configuration
```java
  response.addHeader("Authorization", "Bearer " + token);
  response.addHeader("Access-Control-Expose-Headers", "Authorization");
```

### Additional Utilities
Pass username to session:
```TS    

  const respond = map((res:HttpResponse<User> )=> this.parseResponse(username,res));

  private parseResponse(username:string, response: HttpResponse<User>) {
      // user = res.body;
      const headers = response.headers;
      // console.log(headers);
      console.log(headers);
      let token = headers.get("Authorization").split(' ')[1];
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('auth', username);
      return response.body;
  };

```

```TS
  getUser() {
    return sessionStorage.getItem("auth");
  }

  getUserToken() {
    if(this.getUser() != null)
    return sessionStorage.get("token");
    return null;
  }
```