# web

Development With Angular


### Getting Started:

1. [Node js](https://nodejs.org/en/download/)
2. [Angular CLI](https://angular.io/cli)
3. [Visual Studio Code](https://code.visualstudio.com/download)

### Introduction

1. **Node**

    Node.js comes with the **npm** package manager for Javascript libraries.

    To create an empty package run:
        ```
        npm init
        ```
    The init command will create a package.json file. Similar to maven's pom.xml this file is used to bootstrap a node package and declare any dependencies to other Javascript libraries.
    for example:
        ```
        npm install jquery
        ```
    This command downloads and includes the jquery library in our own package. Other external libraries can be included in a similar fasion. The downloaded packages can be found in the node_modules directory in our root folder.

2. **Angular CLI**

    The angular cli is available through the npm package manager:
    ```
    npm install -g @angular/cli
    ```
    To create a new Angular Project:
    ```
    ng new <project-name>
    ```
    To execute the web application:
    ```
    ng serve
    ```

    Visit localhost:4200

3. **Visual Studio Code**

    Open Visual Studio code and select explorer and the open Folder. Choose the folder created with Angular CLI.