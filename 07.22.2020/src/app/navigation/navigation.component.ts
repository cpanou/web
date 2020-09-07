import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthService } from '../service/auth/basic-auth.service';
import { JwtUtilService } from '../service/auth/jwt-util.service';
import { User } from '../model/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user: User;
  @Output()
  searched = new EventEmitter<string>();

  constructor(private router: Router,
              private auth: BasicAuthService,
              private jwt: JwtUtilService) { }

  ngOnInit(): void {
    this.user = this.jwt.getAuthenticatedUser();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  userSearched(event){
    // console.log(event);
    this.searched.emit(event);
  }

}
