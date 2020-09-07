import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  constructor() { }

  login(username: string, password: string): boolean {

    if (username === "test" && password === "test123") {
      sessionStorage.setItem('authentication', username);
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('authentication');
  }

  isLoggedIn(): boolean {
    let username = sessionStorage.getItem('authentication');
    return username !== null;
  }

}
