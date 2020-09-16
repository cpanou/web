import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { Product } from '../model/Product';
import { OrdersService } from '../service/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList: Order[] = [];

  constructor(private orderService : OrdersService) { }

  ngOnInit(): void {
    this.initializeOrders();
  }

  initializeOrders() {
    this.orderService.getOrders()
      .subscribe(orders => {
        console.log(orders);
        this.orderList = this.parseOrders(orders);
        console.log(this.orderList);
      });
  }

  parseOrders(orders: any[]) : Order[] {
    let orderList : Order[] = [];
    for(let i =0; orders.length > i; i++) {
      let data = orders[i];
      
      let order: Order = {
        id: data['id'],
        status: data['status'],
        submittedDate: data['submittedDate'],
        processedDate: data['processedDate'],
        user: data['user'],
        productList: this.parseProducts(data['productList'])
      }

      orderList.push(order);
    }
    return orderList;
  }

  parseProducts(dataList: any[]) : Product[] {
    let productList : Product[] = [];
    for(let i =0; dataList.length > i; i++) {
      let product: Product;
      let data = dataList[i].product;
      product = {
        id: data['id'],
        productName: data['productName'],
        price: data['price'],
        info: data['info'],
        available: data['available'],
        category: data['category'],
        type: data['type']
      }
      productList.push(product);
    }
    return productList;
  }


}
