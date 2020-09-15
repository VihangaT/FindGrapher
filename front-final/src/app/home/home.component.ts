import { Component, OnInit } from '@angular/core';
import {PhotographersService} from '../services/photographers.service';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLoggedIn = false;
  photographerLoggedIn = false;

  constructor(private photographersService: PhotographersService, private usersService: UsersService) { }

  ngOnInit() {
    this.userLoggedIn = this.usersService.userLoggedIn;
    this.usersService.userLoggedInCheck.subscribe((status) => {
      this.userLoggedIn= status;
    });
    this.photographerLoggedIn = this.photographersService.photographerLoggedIn;
    this.photographersService.photographerLoggedInCheck.subscribe((status) => {
      this.photographerLoggedIn = status;
    });
  }

}
