import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.username);
    console.log(this.password);
    if (this.username === "test" && this.password === "test123") {
      this.loginError = false;
      this.router.navigate(['home']);
    } else {
      this.loginError = true;
    }
  }

}
