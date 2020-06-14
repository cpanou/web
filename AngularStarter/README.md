### **Getting Started With Angular**

Angular is a platform and framework for building single-page client applications using **HTML** and **TypeScript**. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your apps.

The architecture of an Angular application relies on certain fundamental concepts. The basic building blocks are NgModules, which provide a compilation context for components. NgModules collect related code into functional sets; an Angular app is defined by a set of NgModules. An app always has at least a root module that enables bootstrapping, and typically has many more feature modules.

- **Components** define views, which are sets of screen elements that Angular can choose among and modify according to your program logic and data.

- **Components** use services, which provide specific functionality not directly related to views. Service providers can be injected into components as dependencies, making your code modular, reusable, and efficient.

Both components and services are simply classes, with decorators that mark their type and provide metadata that tells Angular how to use them.

- The metadata for a component class associates it with a template that defines a view. A template combines ordinary **HTML** with Angular directives and binding markup that allow Angular to modify the HTML before rendering it for display.

- The metadata for a service class provides the information Angular needs to make it available to components through dependency injection (DI).

An app's components typically define many views, arranged hierarchically. Angular provides the **Router** service to help you define navigation paths among views. The **router** provides sophisticated in-browser navigational capabilities.

1. **Components**

A component controls a patch of screen called a view. Every Angular application has at least one component, the root component that connects a component hierarchy with the page document object model (DOM). Each component defines a class that contains application data and logic, and is associated with an HTML template that defines a view to be displayed in a target environment.

Lets create a new component for the Header view of the sample application. To create a new component run the following command:

   ```
   ng generate component header
   ```

The ```@Component()``` decorator identifies the class immediately below it as a component, and provides the template and related component-specific metadata. The metadata for a component tells Angular where to get the major building blocks that it needs to create and present the component and its view. In particular, it associates a template with the component, either directly with inline code, or by reference. Together, the component and its template describe a view. 

   ```TS
   @Component({
       selector: 'app-header',
       templateUrl: './header.component.html',
       styleUrls: ['./header.component.css']
   })
   ```

This example shows some of the most useful @Component configuration options:

   * ```selector```: A CSS selector that tells Angular to create and insert an instance of this component wherever it finds the corresponding tag in template HTML. For example, if an app's HTML contains ```<app-header></app-header>```, then Angular inserts an instance of the HeroListComponent view between those tags.

   * ```templateUrl```: The module-relative address of this component's HTML template. Alternatively, you can provide the HTML template inline, as the value of the template property. This template defines the component's host view.

   * ```styleUrls```: The module-relative address of this component's stylesheet.

Now lets move the toolbar view to the header's template. To do that we copy the contents inside the:

   ```HTML
   <div class="toolbar" role="banner">...
    </div>
   ```

from the ```app.component.html ``` to the ```header.component.html```. In order to preserve the styling we also need to copy the accompanying css rules to the new module's stylesheet. To the header's template in the app.components view we include the ```<app-header>``` element in the root view. 
If we refresh the browser at localhost:4200 there should be no changes in the view. 

You define a component's application logic— what it does to support the view— inside a class. The class interacts with the view through an API of properties and methods

   ```TS
   export class HeaderComponent implements OnInit {
       title : string;

       constructor() { }

           ngOnInit(): void {
               this.title = 'WEB title';
           }

   }
   ```

Angular creates, updates, and destroys components as the user moves through the application. Your app can take action at each moment in this lifecycle through optional lifecycle hooks, like ```ngOnInit()```. The onInit() callback initializes the directive or component after Angular first displays the data-bound properties and sets the directive or component's input properties.

A template combines HTML with Angular markup that can modify HTML elements before they are displayed. Template directives provide program logic, and binding markup connects your application data and the DOM. There are two types of data binding:

   * Event binding lets your app respond to user input in the target environment by updating your application data.
   * Property binding lets you interpolate values that are computed from your application data into the HTML.

Before a view is displayed, Angular evaluates the directives and resolves the binding syntax in the template to modify the HTML elements and the DOM, according to your program data and logic. Angular supports two-way data binding, meaning that changes in the DOM, such as user choices, are also reflected in your program data.

To display the title property we will use a simple data binding form called interpolation.
```HTML
    <span>Welcome {{ title }}</span>
``` 
The ```{{ title }}``` displays the component's title property in the ```<span>``` element.

Refreshing the browser we should see "Welcome WEB title" in the Toolbar's text.

### **further reading**:
 * [Components](https://angular.io/guide/architecture-components)
 * [lifecycle-hooks](https://angular.io/guide/lifecycle-hooks)
 * [interpolation](https://angular.io/guide/displaying-data#interpolation)