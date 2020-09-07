
## Routing

The Angular Router NgModule provides a service that lets you define a navigation path among the different application states and view hierarchies in your app. It is modeled on the familiar browser navigation conventions:

  - Enter a URL in the address bar and the browser navigates to a corresponding page.
  - Click links on the page and the browser navigates to a new page.
  - Click the browser's back and forward buttons and the browser navigates backward and forward through the history of pages you've seen.

The router maps URL-like paths to views instead of pages. When a user performs an action, such as clicking a link, that would load a new page in the browser, the router intercepts the browser's behavior, and shows or hides view hierarchies.

1. Identify the paths in ```app-routing.module.ts```
  - ```{ path:'', component: LoginComponent},``` no path specified go to login.
  - ```{ path:'login', component: LoginComponent},``` login page specific path.
  - ```{ path:'home', component: NavbarComponent}``` home path to show NavBar etc.

2. Before we had to specify each component in our html. With the Router module we can specify the Router-outlet which will automatically figure out our root components and switch between their views.
  - Lets Change the app.html to contain only the following :
    ```<router-outlet></router-outlet>```

2. See Routing in Action Visit the aforementioned paths.

3. Route from one component to another:
  - The Router reference as a member variable
  - DI in Angular.
  - Lets modify the Login() function to Navigate to the home page on successful login:
    ```TS
    import { Router } from '@angular/router';

    constructor(router: Router) {
    }

    this.router.navigate(['home']);
    ```

  - Lets implement the Logout function in the Navbar page:
    ```TS
    import { Router } from '@angular/router';

    constructor(router: Router) {
    }

    this.router.navigate(['login']);
    ```

### Fine grain our Login page.

1. We will use Bootstrap classes to create a better UI for our Login page.

  - Lets create a Container that will hold the login form.
  - For the moment our form is in the root page leaving us little room for styling. We will wrap the inputs in a div and give it a class-name ```login-container``` so that we can alter the style individualy:
    ```HTML
    <div class="login-container">
      ...
    </div>
    ```
2. CSS Rules for the container:

  ```CSS
  .login-container {
      position: absolute; //We will handle the position of the element
      text-align: center; //All divs inside will be aligned in the center of the div
      min-width: 400px; //specifies the minimun width of the container
      top: 50%; //space from the top
      left: 50%; //space from the left
      transform: translate(-50%, -50%); //transform to actually locate the div in the middle
  }
  ```
the "." specifies that we are refering to a class. In css we can use the
  - "#" for the id of an element,
  - the "." for the class of an element
  - and an html tag e.g. span for all html spans etc.

Lets fix the center alignment of the divs.
We only want the Divs to be aligned in the center. The content of the login form should be aligned to the ```left```.
To do that we wrap the inputs in another div. Now we will use the ```form``` tag and the class ```login-form```:

  ```HTML
   <form class="form-group login-form">
     ...
   </form>
  ```

We will place all the inputs in the form. More for forms later in the Course. In general a form is used to collect input and submit it to a server page via a button or user action. The form autosubmits all inputs inside it including other forms. interesting attributes are:
  - ```action``` form handler location
  - ```target``` window to handle the submition  _top, _self etc.
  - ```method``` method to use in general is POST

In Our Css we will only overwrite the text-align attribute so that the form text is aligned to the left:
    ```CSS
    .login-form{
        text-align: left;
    }
    .error-msg{
        color: rgba(206, 49, 49, 0.863);
    }
    ```
We also styled the error message so that it appears as red.

Now lets create a holder for the page so that we can provide some additional styling for the root element.
  ```HTML
  <div class="login-page">
  </div>
  ```
This element will hold all elements inside the login page. Any rules for the page can be applied to this class.
  ```CSS
  .login-page{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(117, 114, 114, 0.1);
  }
  ```

Lets use Some bootstrap classes to make the ui more appealing. We have already seen form-group and form-control.
***Bootstrap Card*** structure:
```HTML
    <div class="login-container card">
        <div class="card-body">
            <h5 class="card-title">Welcome to E-shop</h5>
            <div class="card-text">Sign In:</div>
        </div>
    </div>
```
All the card-xxx classes have the default bootstrap styling.

3. Flexbox:

Lets add a Logo:
```HTML
<div class="login-page login-content">
    <!-- The logo element -->
    <img class="logo" src="assets/logo.png">
    <!--  -->
    <div class="login-container card">
        <div class="card-body">
          ...
        </div>
    </div>
</div>
```
We want the logo to be placed above the login container element, in exactly the same alignment. The Problem with aligning the logo with the container is that we would have to use absolute positioning to place it directly on the screen. This is where the Flexbox comes in. The Flexible Box Layout Module, makes it easier to design flexible responsive layout structure without using float or positioning.

```CSS
.login-page{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(117, 114, 114, 0.1);
    display: flex;  //defines a flexbox
    flex-direction: column; //orientation of the flex box
    justify-content: center;
    align-items: center;
}
.login-container {
    text-align: center;
    width: 400px;
    box-shadow: 2px 2px 10px #ccc;
}
```