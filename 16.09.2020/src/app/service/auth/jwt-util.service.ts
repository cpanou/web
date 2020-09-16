import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/model/user';

export const UserInfo = {
  AUTH_TOKEN: 'idToken',
  ID: 'userId',
  LAST_NAME: 'lName',
  FIRST_NAME: 'fName',
  EMAIL: 'email',
  USERNAME: 'username'
}

@Injectable({
  providedIn: 'root'
})
export class JwtUtilService {
  private jwt: JwtHelperService;

  constructor() {
    this.jwt = new JwtHelperService();
  }

  parseUserFromToken(token: string) {
    let decoded = this.jwt.decodeToken(token);
    /*
    decoded = {
        "sub": "8",
        "exp": 1595056290,
        "iat": 1595054490
      }
    */
    console.log(decoded);
    sessionStorage.setItem(UserInfo.AUTH_TOKEN, token);
  }

  clearUserInfo() {
    sessionStorage.removeItem(UserInfo.AUTH_TOKEN);
    sessionStorage.removeItem(UserInfo.ID);
  }

  getAuthToken() {
    return sessionStorage.getItem(UserInfo.AUTH_TOKEN);
  }

  getDecodedAuthToken() {
    return this.jwt.decodeToken(this.getAuthToken());
  }

  getUsername() {
    let decoded = this.getDecodedAuthToken();
    return decoded['unm'];
  }

  getFirstName() {
    let decoded = this.getDecodedAuthToken();
    return decoded['fst'];
  }
  
  getLastName() {
    let decoded = this.getDecodedAuthToken();
    return decoded['lst'];
  }
  
  getEmail() {
    let decoded = this.getDecodedAuthToken();
    return decoded['eml'];
  }

  getUserId() {
    let decoded = this.getDecodedAuthToken();
    return decoded['sub'];
  }

  getAuthenticatedUser(): User {
    let token = this.getDecodedAuthToken();
    let user = {
      id : token['sub'],
      username : token['unm'],
      firstname : token['fst'],
      lastname : token['lst'],
      email : token['eml'],
      password : ""
    }
    return user;
  }

}
