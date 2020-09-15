import { Component, OnInit } from '@angular/core';
import { PhotographersService } from '../services/photographers.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-photogrpher-nav',
  templateUrl: './photogrpher-nav.component.html',
  styleUrls: ['./photogrpher-nav.component.css']
})
export class PhotogrpherNavComponent implements OnInit {

  isLogeddIn = false;
  constructor(private photographersService: PhotographersService, private usersService: UsersService) { }

  ngOnInit() {
    let authToken = this.photographersService.token;
    if (this.usersService.userToken !== '') {
      //console.log("no")
      authToken = this.usersService.userToken;
    }
    if(authToken !== ''){
      this.isLogeddIn = true;
    }

  }

}
