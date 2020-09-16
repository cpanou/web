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
  //attribute user
  user: User = new User();

  errorMessage: String = "username exists";
  registerError: boolean = false;

  constructor(private router: Router,
    private auth: BasicAuthService,
    private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.registerService.registerUser(this.user)
      .subscribe(
        response => {
          console.log(response);
           this.router.navigate(['home'])
          },
        error => {
          this.registerError = true;
          this.errorMessage = error;
          console.log(error);
        }
      );
  }

  //redirect to user login
  login(): void {
    this.router.navigate(['login']);
  }

}
