import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthService } from '../service/auth/basic-auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Output()
  searched = new EventEmitter<string>();

  constructor(private router: Router,
              private auth: BasicAuthService) { }

  ngOnInit(): void {
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
