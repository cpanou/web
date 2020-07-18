import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthService } from '../service/auth/basic-auth.service';

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

  constructor(
    private router: Router,
    private auth: BasicAuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    // The userLogin method returns an observable object
    this.auth.userLogin(this.username, this.password)
      //In order for an observable to start execution, someone needs to subscribe to it!
      //When subscribing to the Observable we provide functions as parameters (i.e. Callbacks ), to be executed when the observable emits a specific event.
      .subscribe(
        //(1) The first parameter is a function that will be executed when the observable emits is a next (i.e. success) event, where everything went as expected.
        //    Since the Observable is of Type HttpResponse, the emited value is an HttpResponse ( or anything we tranform it into in a preceding .pipe() )
        result => {
          this.loginError = false;
          this.router.navigate(['home']);
          console.log(result);
        },
        //(2) The second parameter is a function that will be executed when the observable emits an error!
        //    the emited value here is of type <any> ( or anything we transformed it into in a preceding operation)
        error => {
          this.loginError = true;
        });
  }

  register(): void {
    this.router.navigate(['sign-up']);
  }

}
