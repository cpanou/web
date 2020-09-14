import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  errorMessage: string;
  serverError: boolean = false;
  userList: User[] = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getUser()
      .subscribe(
        data => { this.userList = data },
        error => { console.log(error) }
      );
  }

}