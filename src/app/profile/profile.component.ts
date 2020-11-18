import { UserService } from './../services/user.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: String
  email: String
  role: String

  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.username = this.auth.getUsername()
    this.userService.getUserByUsername(this.username).subscribe(result => {
      this.email = result["email"]
      this.role = (result["admin"]) ? "Admin" : "User"
    })
  }

}
