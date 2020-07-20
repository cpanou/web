import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchTerm;

  constructor() { }

  ngOnInit(): void {
  }
  //catch child event and save the value in a
  //local variable
  onSearch(event) {
    this.searchTerm = event;
  }

}
