
The box shadow class defines a shadown around the container to separate it from the background

lets divide the css classes so that we can define the Flexbox separately
```CSS
.login-page{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(117, 114, 114, 0.1);
}

.login-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
```

```HTML
<div class="login-page login-content">
```

Now we still use absolute positioning for the login-page, in general we would like to avoid it for our containers. To recenter our Flexbox  our ```login.component.css``` should look like this:

```CSS
.login-page{
  /*absolute removed*/
    background-color: rgba(117, 114, 114, 0.1);
}
.login-content{
    min-height:100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.login-container {
    text-align: center;
    max-width: 400px;
    box-shadow: 2px 2px 10px #ccc;
}
```
To finish this section we will add a link and the Routing to the Register page that we will create in the future. We want to add a section to our container that prompts a new user to create an account with a message and navigates the user to the register page via a link. To separate the sections we will create a custom divider.

We start with the Html:
```HTML
<div class="divider"><span>or</span></div>
<p class="card-text">Create a new account
    <button (click)="register()" class="btn btn-link">Sign Up</button>
</p>
```
we insert the above elements right after the login form. The element with the ```divider``` class will create a horizontal line that separates the section and will hold the text ```or```. In the section bellow we hold a p element with the message and the button that will handle the navigation.

As in the previous examples we have to create the method ```register()``` that navigates to the register page.
```TS
  register(): void {
      this.router.navigate(['sign-up']);
  }
```
If we press the button we we not see anything in the screen since the register component is not wet created. We will add the path in the Router module after we create it in the following section.

[FlexBox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Not-Found Comoponent

Before we move to the Register page we should first create a component that handles unknown urls.
```
ng generate component error
```
For the moment we will not implement any logic for the component but a single button to return to the home page, a template and some css rules to make it look nice.
Basicaly this component will show the well known 404 NOT FOUND message. We will add the same look and feel as the login page with our centered flexbox:

```HTML
<div class="error-page">
    <div class="error-content">
        <img class="logo" src="assets/logo.png">
        <div class="error-container card">
            <div class="card-body">
                <h2 class="card-title">404 Not Found</h5>
                <p class="card-text">The Requested URL was Not Found</p>

            </div>
        </div>
    </div>
</div>
```

```CSS
.error-page{
    background-color: rgba(117, 114, 114, 0.1);
}
.error-content{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.error-container {
    text-align: center;
    min-width: 400px;
    box-shadow: 2px 2px 10px #ccc;
}
.logo {
    max-width: 240px;
}
```

Now in our Router module we will add the following path:
```TS
  { path:'**', component: ErrorComponent}
```
This maps any unknown urls to the ErrorComponent that will show the Not Found page.

## Register Component

Lets Create a component so that a user can register.
```
ng generate component register
```

The register component will be very similar to the login component.
  - we need a form so that a user can register.
  - we need a button to submit the form.
  - we need navigation links so that a user can return to the login screen.

First lets create add the page to the Router:
```TS
  { path:'sign-up', component: RegisterComponent},
```

* For The Register page we are going to use the same template as the login page.
We will use a Flexbox as the page holder.
```HTML
<div class="register-page">
  <div class="register-content">
  ...
  </div>
</div>
```
Inside the page we will add the logo and a container as the form holder.
```HTML
<img class="logo" src="assets/logo.png">
<div class="register-container card">
  ...
</div>
```
Inside the container we add the form and the submit button inside a card-body.
```HTML
<div class="card-body">
    <h5 class="card-title">Create a new account</h5>
    <div class="card-text">Fill in the form to create a new account to E-shop</div>
    <form class="form-group register-form">
      ...
    </form>
</div>
```

* Next we will provide the register button and navigation functionalities starting with navigation:
```HTML
<p class="card-text">already have an account?
  <button (click)="login()" class="btn btn-link">Sign In</button>
</p>
```

We provide the ```login()``` function to the click event of the button. In the login function we want to navigate the user to the login page:
```TS
  login(): void {
      this.router.navigate(['login']);
  }
```

In a similar fashion we provide a method for when the user clicks the register button:
```HTML
<button (click)="register()" class="btn btn-dark">Submit</button>
<small class="error-msg" *ngIf='exists'>username exists</small>
```

In the register method we add a simple check for the username to show an error message on the screen. If the user is successfully registered we navigate to the home screen:
```TS
  register(): void {
    if(this.username === "me" ){
      this.exists = true;
    }else {
      this.exists = false;
      this.router.navigate(['home']);
    }
  }
```