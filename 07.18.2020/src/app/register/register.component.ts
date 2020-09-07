import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../service/register.service';
import { BasicAuthService } from '../service/auth/basic-auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : User = new User();

  errorMessage: String = "username exists";
  registerError: boolean = false;

  constructor(private router: Router,
              private auth: BasicAuthService,
              private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  register(): void {
    //register a new user
    if (this.user.username === "test"){
      this.registerError = true;
    } else {
      this.registerError = false;
      this.router.navigate(['home']);
    }


    //(HINT) -  login-component.ts for reference

    // (1) Http Call to Register a New User at the server
    //    - use the Register Service to create the actual call
    this.registerService.registerUser(this.user);
    //an http call returns an observable object.
    //subscribe to the observable so that u can receive the emited data.
    
    // (2) Provide 2 callbacks: success, error
    // On Success 
    //  Http Call to Login the user after a successful registration
    //      - BasicAuthService userLogin(username:string, password: string)
    //        (HINT) - use the user.username and user.password provided in the register form
    // On Fail
    //   Show error message

  }

  //redirect to user login
  login(): void {
    this.router.navigate(['login']);
  }

}
