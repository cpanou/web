import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm: string;

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    alert(`User Searched: ${this.searchTerm}`);
    //searchForProducts();
    //ProductsList[];
  }
  


}
