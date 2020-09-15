import { Component, OnInit } from '@angular/core';
import { PhotographersService } from '../services/photographers.service';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userLoggedIn = false;
  photographerLoggedIn = false;
  pageTitle = "Findgrapher";
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



    if (this.usersService.userToken !== '') {
      //console.log("no")
      this.userLoggedIn = true;
    }
  }

  logout() {
    if(this.photographerLoggedIn)
    {
      this.photographersService.logout();
      this.ngOnInit();
    } else  {
      this.usersService.logout();
      this.ngOnInit();
    }


  }

}
