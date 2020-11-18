import { DataSharingService } from './../services/data.service';
import { CartItem } from './../models/cartItem';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: String
  role: String
  cartSize: Number

  constructor(public auth: AuthService, private user: UserService, private router: Router, private dataSharingService: DataSharingService) { 
    this.dataSharingService.cartSize.subscribe( value => {
      this.cartSize = value;
    });
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login'], {queryParams: {loggedOut: 'success'}});
  }
}
