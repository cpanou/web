import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Navigation, UrlTree } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchTerm;
  isProfile: Boolean = false;
  isCart: Boolean = false;
  isOrders: Boolean = false;
  path: UrlTree;

  constructor(private router: Router) {
    this.path = this.router.getCurrentNavigation().extractedUrl;
    console.log(this.path);
   }

  ngOnInit(): void {
    this.isProfile = this.path.toString().indexOf("profile") >= 0;
    console.log("isProfile: "+ this.isProfile);
    this.isCart = this.path.toString().indexOf("Cart") >= 0;
    console.log("isCart: "+ this.isCart);
    this.isOrders = this.path.toString().indexOf("orders") >=0;
    console.log("isOrders: "+ this.isOrders);
  }

  //catch child event and save the value in a
  //local variable
  onSearch(event) {
    this.searchTerm = event;
  }

}
