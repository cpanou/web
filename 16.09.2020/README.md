# EshopBase

In this section we will create the base for the eshop application. To get Started with Angular components and views we will create a Navigation component, that will hold the main naviational links between pages of our app, and a Login component that will handle the user login.

## Setting up the eshop-base app

Create a New Angular Application:

```
ng new eshop-base
```

The UI is going to be based on [bootstrap](https://getbootstrap.com/). To use bootstrap we also need jquery and popper.js.
To include the libraries run:
```
npm install jquery popper bootstrap
```

```
npm install font-awesome
```

To add the new packages to our application we need to include their stylesheets. Open the ```angular.json``` file and add the following to the styles property:
```JSON
"styles": [
  "src/styles.css",

  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/font-awesome/css/font-awesome.css"
]
```

Now we can use css classes from bootstrap in our html.


* [bootstrap-components](https://getbootstrap.com/docs/4.0/components/buttons/)
* [fa - icons](https://fontawesome.bootstrapcheatsheets.com/)
* [bs - icons](https://icons.getbootstrap.com/)


#### Assignment 18 - 07 - 2020

1. Register a User from the register page.

  - implement the register() method so that it uses the ```register.service.ts``` to make an HTTP call to our backend to create a new User.
  - implement the   registerUser(user: User) in the service to make the actual http call.
  - after a succesful registration use the auth service to log the user in.
  - if an error occurs show the error message.


See the ```register.component.ts``` for details.

Files with refereces: ```login.component.ts```, ```basic-auth.service.ts```,```register.component.ts```, ```register.service.ts```.