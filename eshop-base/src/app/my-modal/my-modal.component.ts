import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../model/order';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {

  title: string;
  body: string;
  message: string;
  order: Order;

  open: boolean = true;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

  }


  dismiss() {
    this.open = false;
  }
}
