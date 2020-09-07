import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Credentials } from '../model/credentials';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  constructor(private http: HttpClient) { }

  userLogin(username: string, password: string) {
    let credentials = new Credentials(username, password);

    this.http.post<Credentials>("http://localhost:8080/eshop/login", credentials, { observe: "response", responseType: 'json' })
      .pipe(
        map(response => this.handleResponse(response)),
        catchError(error => this.parseError(error))
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  private parseError(error: HttpErrorResponse) {
    console.log(error);
    console.log(error.error)
    return throwError("Login Error");
  }

  private handleResponse(response: HttpResponse<Credentials>) {
    let authorization = response.headers.get('Authorization');
    let idToken = authorization.split(' ')[1];
    sessionStorage.setItem('id_token', idToken);
    return true;
  }


  login(username: string, password: string): boolean {

    this.userLogin(username, password);

    if (this.isLoggedIn()) {
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('id_token');
  }

  isLoggedIn(): boolean {
    let token = sessionStorage.getItem('id_token');
    return token !== null;
  }

}
