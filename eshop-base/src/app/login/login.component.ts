import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.username);
    console.log(this.password);
    if (this.username === "test" && this.password === "test123") {
      this.loginError = false;
    } else {
      this.loginError = true;
    }

  }

}
