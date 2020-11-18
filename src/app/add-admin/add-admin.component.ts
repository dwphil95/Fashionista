import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../models/user'

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  users: User[]
  constructor(private userService: UserService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(result => {
      this.users = result
    })
  }

  makeAdmin(user: User) {
    this.userService.makeUserAdmin(user).subscribe(result => console.log(result))
    this.router.navigateByUrl('/add-admin');
  }
}
