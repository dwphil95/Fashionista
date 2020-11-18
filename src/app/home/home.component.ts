// import { fadeInAnimation } from './../_animations/index';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  username: String
  notify: string;

  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit(): void {
    this.username = this.auth.getUsername()
    this.route.queryParams.subscribe((params) => {
      const key1 = 'loggedin';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully logged in!';
      }
    });
  }

}
