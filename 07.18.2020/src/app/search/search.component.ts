import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  //(1) - Output decorator to declare the field as an output to the parent component
  @Output()
  searched = new EventEmitter<string>();

  searchTerm: string;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  //(2) - 
  search() {
    //Emit new event with the searchTerm as value
    // this.searched.emit(this.searchTerm);
    this.searchService.searchProducts(this.searchTerm);
  }



}
