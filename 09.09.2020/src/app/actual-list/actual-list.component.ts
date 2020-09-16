import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-actual-list',
  templateUrl: './actual-list.component.html',
  styleUrls: ['./actual-list.component.css']
})
export class ActualListComponent implements OnInit {

  @Input('productList') productList;

  constructor() { }

  ngOnInit(): void {
  }

}
