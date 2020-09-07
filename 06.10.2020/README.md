# EshopBase

In this section we will create the base for the eshop application. To get Started with Angular components and views we will create a Navigation component, that will hold the main naviational links between pages of our app, and a Login component that will handle the user login.

## Setting up

Create a New Angular Application:

```
ng new eshop-base
```

The UI is going to be based on [bootstrap](https://getbootstrap.com/). To use bootstrap we also need jquery and popper.js.
To include the libraries run **inside** the eshop-base folder:
```
npm install jquery popper bootstrap
```

For additional styling we are going to add the font-awesome library
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
