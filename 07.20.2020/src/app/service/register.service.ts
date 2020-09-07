import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  //(2) 
  constructor() { }

    //(HINT) -  basic-auth.service.ts for reference
  registerUser(user: User){
    //(1) HTTP CALL TO CREATE A USER: HttpClient injection
    //(2) make a POST request ( see the basic auth service for reference ) and return the observable.
    //(3) - Optional: Use a .pipe() to manipulate the response object before emiting the result to the component.

  }



}
