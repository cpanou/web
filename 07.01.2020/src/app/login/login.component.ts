import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthService } from '../service/basic-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginError: boolean = false;
  errorMessage: string = "Invalid Credentials";
  xss: string;

  constructor(private router: Router,
              private auth: BasicAuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.xss = this.username;
    if ( this.auth.login(this.username, this.password) ) {
      this.loginError = false;
      this.router.navigate(['home']);
    } else {
      this.loginError = true;
    }
    
  }

  register(): void {
    this.router.navigate(['sign-up']);
  }

}
