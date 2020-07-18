# web Introduction

Development With Angular. In this course we will use Angular CLI and Node.js to create a Single Page application as the frontend of the E-shop application introduced in Fundamentals. 
What we'll learn: 
 - [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
 - [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps)
 - [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
 - [TypeScript](https://www.typescriptlang.org/)

## **Environment**
   1. Download and install [Node js](https://nodejs.org/en/download/)
   2. Install [Angular CLI](https://angular.io/cli) 
   3. Download and install[Visual Studio Code](https://code.visualstudio.com/download)

## **Node.js**

Node js is an asynchronous event-driven JavaScript runtime, used as a server environment. Node.js comes with the **npm** package manager for Javascript libraries, npm (Node package manager) has packages you canuse in your apps to make your development faster and efficient. A package in Node.js contains all the files you need for a module. Modules are JavaScript libraries you can include in your project. 

To create an empty package run:

   ```
   npm init
   ```
The init command will create a package.json file. Similar to maven's pom.xml this file is used to bootstrap a node package and declare any dependencies to other Javascript libraries.
for example:
   ```
   npm install jquery
   ```
This command downloads and includes the jquery library in our package. Other external libraries can be included in a similar fasion. The downloaded packages can be found in the node_modules directory in our rootfolder. [npmjs](https://www.npmjs.com/) hosts many free libraries to use.

## **Angular CLI**
    
Angular, the Angular CLI, and Angular apps depend on features and functionality provided by libraries that are available as npm packages. To download and install npm packages, you must have an npm package manager. We use the Angular CLI to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.
    To install the angular cli run the following command in a terminal:
   ```
   npm install -g @angular/cli
   ```
The ```ng new <project-name>``` command creates a file system directory (the "workspace root"). In the workspace root, it also creates the workspace configuration file (angular.json) and, by default, an initial application project with the same name.

To execute the sample application run:

   ```
   ng serve
   ```
The ng serve command launches the server, watches your files, and rebuilds the app as you make changes to those files. Visit localhost:4200 to see the application.

![Sample Screen](https://github.com/cpanou/web/blob/master/AngularStarter/sources/Sample.JPG)


## **Visual Studio Code**

VScode is the IDE we are going to use to develop the application. Open Visual Studio code, select ```explorer``` (or File from the top meny) and then ```open Folder```. Choose the root folder created with Angular CLI.

## **Resources** 

1. [Angular docs](https://angular.io/docs)
2. [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
3. [Node.js](https://www.w3schools.com/nodejs/default.asp)
