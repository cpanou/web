import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: String;
  email: String;
  password: String;
  firstname: String;
  lastname: String;

  errorMessage: String = "username exists";
  registerError: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    //register a new user
    if (this.username === "test"){
      this.registerError = true;
    } else {
      this.registerError = false;
      this.router.navigate(['home']);
    }
  }

  login(): void {
    //redirect to user login
    this.router.navigate(['login']);
  }

}
