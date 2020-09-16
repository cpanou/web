import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  // (3) - Third Call
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchTerm;

  isProfile: Boolean = false;
  isCheckout: Boolean = false;
  isOrders: Boolean = false;
  isHome: Boolean = false;

  // (1) - First Call
  constructor(private router: Router) {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd){
          this.activatePath(event.url);
        }
      }
    );
  }

  activatePath(path: string){
    this.isProfile = path.indexOf("profile") >= 0;
    console.log("isProfile: "+ this.isProfile);

    this.isCheckout = path.indexOf("checkout") >= 0;
    console.log("isCheckout: "+ this.isCheckout);

    this.isOrders = path.indexOf("orders") >=0;
    console.log("isOrders: "+ this.isOrders);

    this.isHome = !(this.isProfile || this.isCheckout || this.isOrders) || path.indexOf("home") >=0;
    console.log("isHome: "+this.isHome);
  }


  // (2) - Second Call
  ngOnInit(): void {
  }

  //catch child event and save the value in a
  //local variable
  onSearch(event) {
    this.searchTerm = event;
  }

}
