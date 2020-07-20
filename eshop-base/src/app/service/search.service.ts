import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchProductSubject = new BehaviorSubject<string>(null);

  constructor() { }

  searchProducts(searchTerm: string) {
    this.searchProductSubject.next(searchTerm);
  }
  
  getProductSubject(): BehaviorSubject<string>{
    return this.searchProductSubject;
  }

}
